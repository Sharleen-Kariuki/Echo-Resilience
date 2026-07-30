export type IvrDispatchStatus = "pending" | "dispatched" | "failed";

export type IvrHistoryItem = {
  id: number;
  alertId: number;
  regionName: string;
  dialect: string;
  status: string;
  callsCount: number;
  dispatchedAt: string;
  hazardType: string;
  severityLevel: string;
  rawScientificDescription: string;
};

export type IvrFeedbackLog = {
  id: number;
  alertHistoryId: number;
  regionName: string;
  hazardType: string;
  audioFeedbackUrl: string | null;
  translationText: string | null;
  createdAt: string;
};

export type UpdateIvrStatusPayload = {
  status: IvrDispatchStatus;
  callsCount?: number;
};

export type RetryIvrDispatchResponse = {
  success: boolean;
  message: string;
  alertHistoryId: number;
};
