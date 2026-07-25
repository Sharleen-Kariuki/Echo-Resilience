import AfricasTalking from "africastalking";
import { env } from "../../config/env.js";
import type { SmsDispatchInput, SmsProvider } from "./smsProvider.types.js";
import type { SmsDispatchResult } from "../../types/ivr.types.js";

// Lazily constructed — throwing here at import time would crash the whole
// server even when SMS_PROVIDER=mock, so credential validation only happens
// the first time a real send is attempted.
let smsClient: any = null;

function getSmsClient() {
  if (smsClient) return smsClient;

  if (!env.africasTalking.username || !env.africasTalking.apiKey) {
    throw new Error(
      "AT_USERNAME and AT_API_KEY must be set to use the africastalking SMS provider"
    );
  }

  const client = AfricasTalking({
    username: env.africasTalking.username,
    apiKey: env.africasTalking.apiKey,
  });

  smsClient = client.SMS;
  return smsClient;
}

// Africa's Talking's own status strings for a queued/delivered recipient.
// Anything else (e.g. "InvalidPhoneNumber", "InsufficientBalance") is a failure.
const SUCCESS_STATUS_PATTERN = /^(Success|Sent|Queued)/i;

export const africasTalkingSmsProvider: SmsProvider = {
  name: "africastalking",

  async sendSms({ to, message }: SmsDispatchInput): Promise<SmsDispatchResult> {
    const sms = getSmsClient();

    try {
      const response = await sms.send({
        to: [to],
        message,
        ...(env.africasTalking.senderId ? { from: env.africasTalking.senderId } : {}),
      });

      const recipient = response?.SMSMessageData?.Recipients?.[0];
      const status = recipient?.status ?? "Unknown";

      return {
        to,
        success: SUCCESS_STATUS_PATTERN.test(status),
        status,
        providerMessageId: recipient?.messageId,
        raw: response,
      };
    } catch (error) {
      return {
        to,
        success: false,
        status: "Failed",
        error: error instanceof Error ? error.message : String(error),
        raw: error,
      };
    }
  },
};
