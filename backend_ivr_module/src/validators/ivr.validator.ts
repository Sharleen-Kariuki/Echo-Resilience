import type { IvrDispatchStatus, UpdateIvrStatusPayload } from "../types/ivr.types.js";

const allowedStatuses: IvrDispatchStatus[] = ["pending", "dispatched", "failed"];

export function isValidIvrStatus(status: unknown): status is IvrDispatchStatus {
  return typeof status === "string" && allowedStatuses.includes(status as IvrDispatchStatus);
}

export function validatePositiveInteger(value: string): number | null {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

export function validateUpdateIvrStatusPayload(body: unknown): {
  valid: boolean;
  errors: string[];
  data?: UpdateIvrStatusPayload;
} {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Request body must be an object"] };
  }

  const payload = body as Record<string, unknown>;

  if (!isValidIvrStatus(payload.status)) {
    errors.push("status must be one of: pending, dispatched, failed");
  }

  if (
    payload.callsCount !== undefined &&
    (!Number.isInteger(payload.callsCount) || Number(payload.callsCount) < 0)
  ) {
    errors.push("callsCount must be a non-negative integer");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: {
      status: payload.status as IvrDispatchStatus,
      callsCount: payload.callsCount as number | undefined,
    },
  };
}
