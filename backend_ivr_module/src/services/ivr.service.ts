import { pool } from "../db/pool.js";
import type {
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
  };
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
      a.raw_scientific_description
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
      a.raw_scientific_description
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

  const updateQuery = `
    UPDATE alert_history
    SET
      status = $1,
      calls_count = $2,
      dispatched_at = CASE
        WHEN $1 = 'dispatched' THEN CURRENT_TIMESTAMP
        ELSE dispatched_at
      END
    WHERE id = $3
    RETURNING id;
  `;

  await pool.query(updateQuery, [payload.status, callsCount, id]);

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
