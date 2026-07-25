import type {
  DispatchSmsPayload,
  IvrDispatchStatus,
  UpdateIvrStatusPayload,
} from "../types/ivr.types.js";

const allowedStatuses: IvrDispatchStatus[] = ["pending", "dispatched", "failed"];

export function isValidIvrStatus(status: unknown): status is IvrDispatchStatus {
  return typeof status === "string" && allowedStatuses.includes(status as IvrDispatchStatus);
}

export function validatePositiveInteger(value: string | string[] | undefined): number | null {
  const parsed = Number(Array.isArray(value) ? value[0] : value);

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

// Loose E.164-style check (optional leading +, 7-15 digits) — good enough to
// catch obvious typos in a manually-entered demo number without rejecting
// valid international formats.
const PHONE_NUMBER_PATTERN = /^\+?[1-9]\d{6,14}$/;

export function validateDispatchSmsPayload(body: unknown): {
  valid: boolean;
  errors: string[];
  data?: DispatchSmsPayload;
} {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Request body must be an object"] };
  }

  const payload = body as Record<string, unknown>;

  if (!Array.isArray(payload.phoneNumbers) || payload.phoneNumbers.length === 0) {
    return { valid: false, errors: ["phoneNumbers must be a non-empty array of strings"] };
  }

  const phoneNumbers = payload.phoneNumbers;

  phoneNumbers.forEach((value, index) => {
    if (typeof value !== "string" || !PHONE_NUMBER_PATTERN.test(value)) {
      errors.push(`phoneNumbers[${index}] is not a valid phone number: ${String(value)}`);
    }
  });

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: { phoneNumbers: phoneNumbers as string[] },
  };
}
