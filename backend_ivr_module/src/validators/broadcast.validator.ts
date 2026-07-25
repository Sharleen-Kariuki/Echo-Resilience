export type BroadcastPayload = {
  regionId?: number;
  communityId?: number;
};

// Both fields are optional — the broadcast service falls back to the
// alert_history row's own regionId when regionId isn't provided.
export function validateBroadcastPayload(body: unknown): {
  valid: boolean;
  errors: string[];
  data?: BroadcastPayload;
} {
  const errors: string[] = [];
  const payload = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;

  let regionId: number | undefined;
  let communityId: number | undefined;

  if (payload.regionId !== undefined) {
    const parsed = Number(payload.regionId);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      errors.push("regionId must be a positive integer");
    } else {
      regionId = parsed;
    }
  }

  if (payload.communityId !== undefined) {
    const parsed = Number(payload.communityId);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      errors.push("communityId must be a positive integer");
    } else {
      communityId = parsed;
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, errors: [], data: { regionId, communityId } };
}
