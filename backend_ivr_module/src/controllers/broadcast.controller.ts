import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { dispatchBroadcast, buildWarningMessage } from "../services/broadcast.service.js";
import { buildPlayResponse, buildSayResponse } from "../services/voiceXml.js";
import { env } from "../config/env.js";
import { validateBroadcastPayload } from "../validators/broadcast.validator.js";
import { validatePositiveInteger } from "../validators/ivr.validator.js";

export async function postBroadcast(req: Request, res: Response, next: NextFunction) {
  try {
    const id = validatePositiveInteger(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid alert history id" });
    }

    const validation = validateBroadcastPayload(req.body);

    if (!validation.valid || !validation.data) {
      return res.status(400).json({
        message: "Invalid request body",
        errors: validation.errors,
      });
    }

    const result = await dispatchBroadcast(id, validation.data);

    if (!result) {
      return res.status(404).json({ message: "Alert history item not found" });
    }

    const { message: warningMessage, ...rest } = result;

    return res.status(200).json({
      message:
        result.totalRecipients === 0
          ? "No active, consenting community members found for this scope — nothing was dispatched."
          : "Broadcast dispatch complete",
      warningMessage,
      ...rest,
    });
  } catch (error) {
    return next(error);
  }
}

// Twilio hits this URL (the `url` passed to calls.create) once the call is
// answered, expecting TwiML back that says what to do. Twilio embeds no
// correlation info of its own in this request, so the call was placed with
// this exact URL carrying ?callAttemptId=<id> as a query param (see
// twilioCallProvider.ts) — that's how we know which alert/message to play.
// This URL must be publicly reachable (an ngrok tunnel in development,
// since Twilio's servers cannot reach localhost) — see README.
export async function postVoiceCallback(req: Request, res: Response, next: NextFunction) {
  try {
    const callAttemptId = req.query.callAttemptId ? Number(req.query.callAttemptId) : null;

    const attempt = callAttemptId
      ? await prisma.callAttempt.findUnique({
          where: { id: callAttemptId },
          include: { alertHistory: { include: { alert: { include: { hazardType: true } } } } },
        })
      : null;

    res.set("Content-Type", "text/xml");

    if (!attempt) {
      // Can't correlate this callback to a known attempt — respond with a
      // safe no-op rather than erroring, so Twilio doesn't retry forever.
      return res.status(200).send(buildSayResponse("Sorry, we could not process this call."));
    }

    // Call just connected. Mark in_progress (only meaningful the first time —
    // harmless if Twilio ever re-requests TwiML mid-session).
    if (attempt.status === "queued") {
      await prisma.callAttempt.update({
        where: { id: attempt.id },
        data: { status: "in_progress" },
      });
    }

    if (attempt.alertHistory.audioUrl) {
      const audioUrl = new URL(attempt.alertHistory.audioUrl, env.mainApiBaseUrl).toString();
      return res.status(200).send(buildPlayResponse(audioUrl));
    }

    return res.status(200).send(buildSayResponse(buildWarningMessage(attempt.alertHistory)));
  } catch (error) {
    return next(error);
  }
}

// Twilio hits this URL (the `statusCallback` passed to calls.create) at each
// call-state transition we subscribed to (initiated/ringing/answered/
// completed), posting CallStatus. Only terminal states are acted on here —
// the connect/in_progress transition is handled by postVoiceCallback above.
export async function postVoiceStatusCallback(req: Request, res: Response, next: NextFunction) {
  try {
    const callAttemptId = req.query.callAttemptId ? Number(req.query.callAttemptId) : null;
    const body = req.body as Record<string, unknown>;
    const callStatus = typeof body.CallStatus === "string" ? body.CallStatus : undefined;

    const TERMINAL_STATUSES = new Set(["completed", "busy", "failed", "no-answer", "canceled"]);

    if (callAttemptId && callStatus && TERMINAL_STATUSES.has(callStatus)) {
      const failed = callStatus !== "completed";

      await prisma.callAttempt.update({
        where: { id: callAttemptId },
        data: {
          status: failed ? "failed" : "completed",
          completedAt: new Date(),
          failureReason: failed ? callStatus : null,
        },
      });
    }

    return res.status(200).send();
  } catch (error) {
    return next(error);
  }
}
