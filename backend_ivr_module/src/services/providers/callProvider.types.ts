export type CallDispatchInput = {
  to: string;
  message: string;
  audioUrl?: string | null;
  clientRequestId?: string;
  alertHistoryId?: number;
  // The voice-enabled originating number — comes from IvrConfig (DB), not
  // .env, since it's operational config rather than a credential.
  callFrom?: string;
};

export type CallDispatchStatus = "queued" | "in_progress" | "completed" | "failed";

export type CallDispatchResult = {
  to: string;
  success: boolean;
  status: CallDispatchStatus;
  providerCallId?: string;
  error?: string;
  raw?: unknown;
};

export type CallProvider = {
  name: string;
  dispatchCall(input: CallDispatchInput): Promise<CallDispatchResult>;
};
