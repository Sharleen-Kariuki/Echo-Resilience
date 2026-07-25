import type { SmsDispatchResult } from "../../types/ivr.types.js";

export type SmsDispatchInput = {
  to: string;
  message: string;
  alertHistoryId?: number;
};

export type SmsProvider = {
  name: string;
  sendSms(input: SmsDispatchInput): Promise<SmsDispatchResult>;
};
