import { pool } from "../db/pool.js";
import { getSmsProvider } from "./sms/index.js";
import type {
  DispatchSmsResponse,
  IvrDispatchStatus,
  IvrFeedbackLog,
  IvrHistoryItem,
  RetryIvrDispatchResponse,
  UpdateIvrStatusPayload,
} from "../types/ivr.types.js";

function mapIvrHistoryRow(row: any): IvrHistoryItem {
  return {
    id: row.id,
    alertId: row.alert_id,
    regionName: row.region_name,
    dialect: row.dialect,
    status: row.status,
    callsCount: row.calls_count,
    dispatchedAt: row.dispatched_at,
    hazardType: row.hazard_type,
    severityLevel: row.severity_level,
    rawScientificDescription: row.raw_scientific_description,
    simplifiedText: row.simplified_text,
    translatedText: row.translated_text,
    audioUrl: row.audio_url,
  };
}

// The AI pipeline (see backend/src/services/aiService.js) populates
// translated_text/simplified_text on this row when the alert is dispatched
// via POST /api/alerts/:id/dispatch. If neither is present yet (e.g. someone
// calls SMS dispatch before that step), fall back to a plain-English notice
// built from the raw alert so the SMS still goes out.
function buildSmsMessage(item: IvrHistoryItem): string {
  const body = item.translatedText || item.simplifiedText;

  if (body) {
    return `EchoResilience Alert (${item.hazardType}, ${item.severityLevel}): ${body}`;
  }

  return `EchoResilience Alert: ${item.hazardType} (${item.severityLevel}) reported for your area. ${item.rawScientificDescription}`.slice(
    0,
    300
  );
}

function mapIvrFeedbackRow(row: any): IvrFeedbackLog {
  return {
    id: row.id,
    alertHistoryId: row.alert_history_id,
    regionName: row.region_name,
    hazardType: row.hazard_type,
    audioFeedbackUrl: row.audio_feedback_url,
    translationText: row.translation_text,
    createdAt: row.created_at,
  };
}

export async function findIvrHistory(): Promise<IvrHistoryItem[]> {
  const query = `
    SELECT
      ah.id,
      ah.alert_id,
      r.name AS region_name,
      ah.dialect,
      ah.status,
      ah.calls_count,
      ah.dispatched_at,
      ht.name AS hazard_type,
      a.severity_level,
      a.raw_scientific_description,
      ah.simplified_text,
      ah.translated_text,
      ah.audio_url
    FROM alert_history ah
    JOIN alerts a ON ah.alert_id = a.id
    JOIN regions r ON ah.region_id = r.id
    JOIN hazard_types ht ON a.hazard_type_id = ht.id
    ORDER BY ah.dispatched_at DESC;
  `;

  const result = await pool.query(query);
  return result.rows.map(mapIvrHistoryRow);
}

export async function findIvrHistoryById(id: number): Promise<IvrHistoryItem | null> {
  const query = `
    SELECT
      ah.id,
      ah.alert_id,
      r.name AS region_name,
      ah.dialect,
      ah.status,
      ah.calls_count,
      ah.dispatched_at,
      ht.name AS hazard_type,
      a.severity_level,
      a.raw_scientific_description,
      ah.simplified_text,
      ah.translated_text,
      ah.audio_url
    FROM alert_history ah
    JOIN alerts a ON ah.alert_id = a.id
    JOIN regions r ON ah.region_id = r.id
    JOIN hazard_types ht ON a.hazard_type_id = ht.id
    WHERE ah.id = $1;
  `;

  const result = await pool.query(query, [id]);

  if (result.rowCount === 0) {
    return null;
  }

  return mapIvrHistoryRow(result.rows[0]);
}

export async function findIvrFeedbackLogs(): Promise<IvrFeedbackLog[]> {
  const query = `
    SELECT
      fl.id,
      fl.alert_history_id,
      r.name AS region_name,
      ht.name AS hazard_type,
      fl.audio_feedback_url,
      fl.translation_text,
      fl.created_at
    FROM feedback_logs fl
    JOIN regions r ON fl.region_id = r.id
    JOIN hazard_types ht ON fl.hazard_type_id = ht.id
    ORDER BY fl.created_at DESC;
  `;

  const result = await pool.query(query);
  return result.rows.map(mapIvrFeedbackRow);
}

export async function findIvrFeedbackLogById(id: number): Promise<IvrFeedbackLog | null> {
  const query = `
    SELECT
      fl.id,
      fl.alert_history_id,
      r.name AS region_name,
      ht.name AS hazard_type,
      fl.audio_feedback_url,
      fl.translation_text,
      fl.created_at
    FROM feedback_logs fl
    JOIN regions r ON fl.region_id = r.id
    JOIN hazard_types ht ON fl.hazard_type_id = ht.id
    WHERE fl.id = $1;
  `;

  const result = await pool.query(query, [id]);

  if (result.rowCount === 0) {
    return null;
  }

  return mapIvrFeedbackRow(result.rows[0]);
}

export async function updateIvrHistoryStatus(
  id: number,
  payload: UpdateIvrStatusPayload
): Promise<IvrHistoryItem | null> {
  const existing = await findIvrHistoryById(id);

  if (!existing) {
    return null;
  }

  const callsCount = payload.callsCount ?? existing.callsCount;

  // $1 is repeated as both a direct assignment and a CASE comparison below —
  // node-postgres's extended query protocol can't always resolve one type
  // for a parameter used in two different syntactic roles ("inconsistent
  // types deduced for parameter $1"). Passing status again as its own $4
  // param sidesteps the ambiguity instead of relying on a cast.
  const updateQuery = `
    UPDATE alert_history
    SET
      status = $1,
      calls_count = $2,
      dispatched_at = CASE
        WHEN $4 = 'dispatched' THEN CURRENT_TIMESTAMP
        ELSE dispatched_at
      END
    WHERE id = $3
    RETURNING id;
  `;

  await pool.query(updateQuery, [payload.status, callsCount, id, payload.status]);

  return findIvrHistoryById(id);
}

export async function retryIvrDispatch(id: number): Promise<RetryIvrDispatchResponse | null> {
  const existing = await findIvrHistoryById(id);

  if (!existing) {
    return null;
  }

  const query = `
    UPDATE alert_history
    SET
      status = 'pending',
      calls_count = calls_count + 1
    WHERE id = $1
    RETURNING id;
  `;

  await pool.query(query, [id]);

  return {
    success: true,
    message: "IVR dispatch retry queued successfully.",
    alertHistoryId: id,
  };
}

// Sends the AI-generated dialect warning (already produced by
// POST /api/alerts/:id/dispatch in the main backend) as SMS to a
// manually-supplied list of phone numbers — there is no recipient/phone
// table yet, so the caller must provide numbers explicitly (see
// backend_ivr_module/README.md).
export async function dispatchSmsForHistory(
  id: number,
  phoneNumbers: string[]
): Promise<DispatchSmsResponse | null> {
  const existing = await findIvrHistoryById(id);

  if (!existing) {
    return null;
  }

  const message = buildSmsMessage(existing);
  const provider = getSmsProvider();

  const results = await Promise.all(
    phoneNumbers.map((to) => provider.sendSms({ to, message, alertHistoryId: id }))
  );

  const successCount = results.filter((result) => result.success).length;
  const failureCount = results.length - successCount;
  const newStatus: IvrDispatchStatus = successCount > 0 ? "dispatched" : "failed";

  // See the identical $1-reuse note in updateIvrHistoryStatus above.
  const updateQuery = `
    UPDATE alert_history
    SET
      status = $1,
      calls_count = calls_count + $2,
      dispatched_at = CASE
        WHEN $4 = 'dispatched' THEN CURRENT_TIMESTAMP
        ELSE dispatched_at
      END
    WHERE id = $3
    RETURNING id;
  `;

  await pool.query(updateQuery, [newStatus, successCount, id, newStatus]);

  const historyItem = await findIvrHistoryById(id);

  return {
    provider: provider.name,
    historyItem: historyItem as IvrHistoryItem,
    message,
    recipients: phoneNumbers,
    successCount,
    failureCount,
    results,
  };
}
