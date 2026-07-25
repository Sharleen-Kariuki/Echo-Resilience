import type { CallDispatchInput, CallDispatchResult, CallProvider } from "./callProvider.types.js";

// Demo-safe fallback for voice — never dials a real number. Logs to the
// console and reports "queued" immediately, so the broadcast flow (creating
// CallAttempt rows, updating alert_history) is fully exercisable without a
// live, voice-enabled Twilio number.
export const mockCallProvider: CallProvider = {
  name: "mock",

  async dispatchCall({ to, message, audioUrl }: CallDispatchInput): Promise<CallDispatchResult> {
    console.log(`[mock-voice] → ${to}: ${audioUrl ? `(play ${audioUrl})` : message}`);

    return {
      to,
      success: true,
      status: "queued",
      providerCallId: `mock-call-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      raw: { mock: true },
    };
  },
};
