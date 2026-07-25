import { prisma } from "../lib/prisma.js";
import { getCallProvider } from "./providers/index.js";
import { getSmsProvider } from "./sms/index.js";

export type BroadcastFilter = {
  regionId?: number;
  communityId?: number;
};

export type BroadcastRecipientOutcome = {
  callAttemptId: number;
  memberId: number | null;
  phoneNumber: string;
  channel: "voice" | "sms";
  success: boolean;
  status: string;
  providerRef?: string;
  error?: string;
};

export type BroadcastResult = {
  alertHistoryId: number;
  channelUsed: "voice" | "sms";
  provider: string;
  message: string;
  totalRecipients: number;
  successCount: number;
  failureCount: number;
  alertHistoryStatus: string;
  recipients: BroadcastRecipientOutcome[];
};

// Same fallback order as the SMS-only flow (translated -> simplified -> raw
// alert), just re-derived from Prisma's include shape instead of the raw-pg
// row shape ivr.service.ts's buildSmsMessage works from.
export function buildWarningMessage(alertHistory: {
  translatedText: string | null;
  simplifiedText: string | null;
  alert: { severityLevel: string; rawScientificDescription: string; hazardType: { name: string } };
}): string {
  const body = alertHistory.translatedText || alertHistory.simplifiedText;
  const hazardType = alertHistory.alert.hazardType.name;
  const severityLevel = alertHistory.alert.severityLevel;

  if (body) {
    return `EchoResilience Alert (${hazardType}, ${severityLevel}): ${body}`;
  }

  return `EchoResilience Alert: ${hazardType} (${severityLevel}) reported for your area. ${alertHistory.alert.rawScientificDescription}`.slice(
    0,
    300
  );
}

// KNOWN LIMITATION (intentional for the hackathon demo): one AlertHistory
// row has exactly one dialect and one pre-generated audio file, and every
// member matched by regionId/communityId gets that same audio — even though
// CommunityMember.language/.dialect are stored per-person. There is no
// per-recipient audio selection yet.
//
// FUTURE IMPROVEMENT (production): group the matched CommunityMembers by
// their own `dialect` field, ensure one AI-generated AlertHistory/audio
// exists per (alert, region, dialect) group, and dispatch each group against
// its own matching audio — so each recipient hears their own dialect
// instead of whichever one dialect the admin picked for the whole region.
// Deliberately not implemented now: demo priority is one working voice
// broadcast, and building it right requires deciding how/when the missing-
// dialect AI generation gets triggered (this module has no AI wiring today
// — that pipeline lives in backend/src/services/aiService.js -> AI/).
export async function dispatchBroadcast(
  alertHistoryId: number,
  filter: BroadcastFilter
): Promise<BroadcastResult | null> {
  const alertHistory = await prisma.alertHistory.findUnique({
    where: { id: alertHistoryId },
    include: { alert: { include: { hazardType: true } } },
  });

  if (!alertHistory) {
    return null;
  }

  const message = buildWarningMessage(alertHistory);

  // Voice is the target channel; SMS is fallback-only, per the current
  // architecture decision. Voice is used only when an active IvrConfig row
  // has a voicePhoneNumber set — otherwise there is no originating number to
  // call from, so broadcasting falls back to SMS automatically.
  const ivrConfig = await prisma.ivrConfig.findFirst({
    where: { isActive: true },
    orderBy: { id: "asc" },
  });
  const channel: "voice" | "sms" = ivrConfig?.voicePhoneNumber ? "voice" : "sms";

  const regionId = filter.regionId ?? alertHistory.regionId;
  const members = await prisma.communityMember.findMany({
    where: {
      regionId,
      isActive: true,
      consent: true,
      ...(filter.communityId ? { communityId: filter.communityId } : {}),
    },
  });

  const callProvider = channel === "voice" ? getCallProvider() : null;
  const smsProvider = channel === "sms" ? getSmsProvider() : null;
  const providerName = (callProvider ?? smsProvider)!.name;

  if (members.length === 0) {
    // Nothing to dispatch — report this plainly instead of silently
    // succeeding. alert_history is left untouched (no attempt was made).
    return {
      alertHistoryId,
      channelUsed: channel,
      provider: providerName,
      message,
      totalRecipients: 0,
      successCount: 0,
      failureCount: 0,
      alertHistoryStatus: alertHistory.status,
      recipients: [],
    };
  }

  // Create one CallAttempt row per recipient up front so each has an id to
  // use as the voice provider's clientRequestId (needed to correlate the
  // later async voice-callback hit back to the right attempt/message).
  const attempts = await Promise.all(
    members.map((member) =>
      prisma.callAttempt.create({
        data: {
          alertHistoryId,
          memberId: member.id,
          phoneNumber: member.phoneNumber,
          channel,
          status: "pending",
          provider: providerName,
          language: member.language,
          dialect: member.dialect,
        },
      })
    )
  );

  const recipients: BroadcastRecipientOutcome[] = await Promise.all(
    attempts.map(async (attempt) => {
      const now = new Date();
      let success: boolean;
      let status: string;
      let providerRef: string | undefined;
      let error: string | undefined;

      if (channel === "voice") {
        const result = await callProvider!.dispatchCall({
          to: attempt.phoneNumber,
          message,
          audioUrl: alertHistory.audioUrl,
          clientRequestId: String(attempt.id),
          callFrom: ivrConfig?.voicePhoneNumber ?? undefined,
        });
        success = result.success;
        // A successful voice dispatch is only "queued" — the real
        // completed/failed outcome arrives later via POST /api/ivr/voice-callback.
        status = result.success ? "queued" : "failed";
        providerRef = result.providerCallId;
        error = result.error;
      } else {
        const result = await smsProvider!.sendSms({
          to: attempt.phoneNumber,
          message,
          alertHistoryId,
        });
        success = result.success;
        // SMS is synchronous — the send API's response is the final outcome.
        status = result.success ? "completed" : "failed";
        providerRef = result.providerMessageId;
        error = result.error;
      }

      await prisma.callAttempt.update({
        where: { id: attempt.id },
        data: {
          status,
          providerCallId: providerRef,
          attemptCount: { increment: 1 },
          lastAttemptAt: now,
          completedAt: status === "queued" ? null : now,
          failureReason: success ? null : error ?? "Unknown provider error",
        },
      });

      return {
        callAttemptId: attempt.id,
        memberId: attempt.memberId,
        phoneNumber: attempt.phoneNumber,
        channel,
        success,
        status,
        providerRef,
        error,
      };
    })
  );

  const successCount = recipients.filter((recipient) => recipient.success).length;
  const failureCount = recipients.length - successCount;
  const alertHistoryStatus = successCount === 0 ? "failed" : failureCount === 0 ? "dispatched" : "partial";

  await prisma.alertHistory.update({
    where: { id: alertHistoryId },
    data: {
      status: alertHistoryStatus,
      callsCount: { increment: successCount },
      ...(successCount > 0 ? { dispatchedAt: new Date() } : {}),
    },
  });

  return {
    alertHistoryId,
    channelUsed: channel,
    provider: providerName,
    message,
    totalRecipients: recipients.length,
    successCount,
    failureCount,
    alertHistoryStatus,
    recipients,
  };
}
