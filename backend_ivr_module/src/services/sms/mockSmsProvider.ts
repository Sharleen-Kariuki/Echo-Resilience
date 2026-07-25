import type { SmsDispatchInput, SmsProvider } from "./smsProvider.types.js";
import type { SmsDispatchResult } from "../../types/ivr.types.js";

// Demo-safe fallback — never touches a real telephony/SMS API. Logs to the
// console so a demo run still shows something happened, and always succeeds
// so the dispatch flow (status/calls_count update) is fully exercisable
// without Africa's Talking credentials.
export const mockSmsProvider: SmsProvider = {
  name: "mock",

  async sendSms({ to, message }: SmsDispatchInput): Promise<SmsDispatchResult> {
    console.log(`[mock-sms] → ${to}: ${message}`);

    return {
      to,
      success: true,
      status: "Sent",
      providerMessageId: `mock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      raw: { mock: true },
    };
  },
};
