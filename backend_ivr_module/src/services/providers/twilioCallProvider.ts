import twilio from "twilio";
import { env } from "../../config/env.js";
import type { CallDispatchInput, CallDispatchResult, CallProvider } from "./callProvider.types.js";

// Lazily constructed for the same reason as the other providers — throwing
// at import time would crash the server even when Twilio isn't the active
// voice provider.
let twilioClient: ReturnType<typeof twilio> | null = null;

function getTwilioClient() {
  if (twilioClient) return twilioClient;

  if (!env.twilio.accountSid || !env.twilio.authToken) {
    throw new Error("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN must be set to use the twilio call provider");
  }

  twilioClient = twilio(env.twilio.accountSid, env.twilio.authToken);
  return twilioClient;
}

// Unlike Africa's Talking (where the callback URL is a fixed setting on the
// number, configured once in their dashboard), Twilio lets you pass the
// callback URL per call — so we embed the CallAttempt id as a query param
// instead of relying on the provider to echo a field back. This is what
// src/controllers/broadcast.controller.ts's Twilio callback handlers read.
function buildCallbackUrl(path: string, callAttemptId: string | undefined): string {
  const url = new URL(path, env.voiceCallbackBaseUrl);
  if (callAttemptId) {
    url.searchParams.set("callAttemptId", callAttemptId);
  }
  return url.toString();
}

export const twilioCallProvider: CallProvider = {
  name: "twilio",

  async dispatchCall({ to, callFrom, clientRequestId }: CallDispatchInput): Promise<CallDispatchResult> {
    const client = getTwilioClient();

    if (!callFrom) {
      return {
        to,
        success: false,
        status: "failed",
        error: "No voice-enabled originating number configured (see IvrConfig.voicePhoneNumber)",
      };
    }

    try {
      const call = await client.calls.create({
        to,
        from: callFrom,
        url: buildCallbackUrl("/api/ivr/voice-callback", clientRequestId),
        statusCallback: buildCallbackUrl("/api/ivr/voice-status-callback", clientRequestId),
        statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
        statusCallbackMethod: "POST",
      });

      // Twilio's initial response status is "queued" or "initiated" — the
      // real outcome (answered/completed/failed/no-answer/busy) arrives
      // later via the statusCallback webhook.
      return {
        to,
        success: true,
        status: "queued",
        providerCallId: call.sid,
        raw: { sid: call.sid, status: call.status },
      };
    } catch (error) {
      return {
        to,
        success: false,
        status: "failed",
        error: error instanceof Error ? error.message : String(error),
        raw: error,
      };
    }
  },
};
