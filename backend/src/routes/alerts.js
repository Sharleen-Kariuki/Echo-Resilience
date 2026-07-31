import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { processAlert, generateAudio } from '../services/aiService.js';

const router = Router();

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/alerts?hazardTypeId=1&regionId=2&page=1&limit=20
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', authenticate, async (req, res) => {
  const { hazardTypeId, regionId, page = 1, limit = 20 } = req.query;

  const where = {};
  if (hazardTypeId) where.hazardTypeId = Number(hazardTypeId);
  if (regionId) where.alertRegions = { some: { regionId: Number(regionId) } };

  const [alerts, total] = await Promise.all([
    prisma.alert.findMany({
      where,
      include: {
        hazardType:     { select: { id: true, name: true } },
        createdByUser:  { select: { id: true, fullName: true } },
        alertRegions:   { include: { region: { select: { id: true, name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
      skip:  (Number(page) - 1) * Number(limit),
      take:  Number(limit),
    }),
    prisma.alert.count({ where }),
  ]);

  res.json({ alerts, total, page: Number(page), limit: Number(limit) });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/alerts  (admin only)
// Body: { hazardTypeId, severityLevel, rawScientificDescription, regionIds: [1,2] }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/', authenticate, requireAdmin, async (req, res) => {
  const { hazardTypeId, severityLevel, rawScientificDescription, regionIds } = req.body;

  if (!hazardTypeId || !severityLevel || !rawScientificDescription || !regionIds?.length) {
    return res.status(400).json({
      error: 'hazardTypeId, severityLevel, rawScientificDescription, and regionIds[] are required',
    });
  }

  const alert = await prisma.alert.create({
    data: {
      hazardTypeId:            Number(hazardTypeId),
      severityLevel,
      rawScientificDescription,
      createdByUserId:         req.user.id,
      alertRegions: {
        create: regionIds.map(id => ({ regionId: Number(id) })),
      },
    },
    include: {
      hazardType:   { select: { id: true, name: true } },
      alertRegions: { include: { region: { select: { id: true, name: true } } } },
    },
  });

  res.status(201).json(alert);
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/alerts/:id  — full detail with history
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id', authenticate, async (req, res) => {
  const alert = await prisma.alert.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      hazardType:    { select: { id: true, name: true } },
      createdByUser: { select: { id: true, fullName: true } },
      alertRegions:  { include: { region: true } },
      alertHistory: {
        include: { region: { select: { id: true, name: true } } },
        orderBy: { dispatchedAt: 'desc' },
      },
    },
  });

  if (!alert) return res.status(404).json({ error: 'Alert not found' });
  res.json(alert);
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/alerts/:id/dispatch  (admin only)
// Runs the full AI pipeline: simplify → translate → TTS audio → save to alert_history
//
// Body: {
//   regionId:       number,    — which region to dispatch to
//   dialect:        string,    — target language e.g. "Somali", "Turkana"
//   generateAudio?: boolean    — default true; set false to skip TTS
// }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:id/dispatch', authenticate, requireAdmin, async (req, res) => {
  const { regionId, dialect, generateAudio: doTTS = true } = req.body;

  if (!regionId || !dialect) {
    return res.status(400).json({ error: 'regionId and dialect are required' });
  }

  const alert = await prisma.alert.findUnique({
    where: { id: Number(req.params.id) },
    include: { hazardType: true },
  });
  if (!alert) return res.status(404).json({ error: 'Alert not found' });

  // Create a placeholder record to track this dispatch attempt
  let historyRecord = await prisma.alertHistory.create({
    data: {
      alertId:  alert.id,
      regionId: Number(regionId),
      dialect,
      status:   'processing',
    },
  });

  try {
    // 1. AI pipeline: simplify + translate + extract
    const aiResult = await processAlert({
      raw_alert:      alert.rawScientificDescription,
      target_dialect: dialect,
      severity_level: alert.severityLevel,
    });

    let audioUrl = null;

    // 2. TTS audio generation (optional — skip for Turkana or if flagged)
    if (doTTS && !aiResult.needs_human_review) {
      try {
        const audioResult = await generateAudio({
          alert_result: aiResult,
          alert_id:     `${alert.id}_${historyRecord.id}`,
        });
        if (audioResult.audio_path) {
          // Convert local filesystem path → public URL served by the /audio route
          const filename = audioResult.audio_path.replace(/\\/g, '/').split('/').pop();
          audioUrl = `/audio/${filename}`;
        }
      } catch (ttsErr) {
        // TTS failure is non-fatal — save text output and flag the audio as unavailable
        console.warn('TTS generation skipped (non-fatal):', ttsErr.message);
      }
    }

    // 3. Persist AI output to alert_history
    historyRecord = await prisma.alertHistory.update({
      where: { id: historyRecord.id },
      data: {
        status:        'dispatched',
        simplifiedText: aiResult.simplified_en,
        translatedText: aiResult.translated_text ?? aiResult.translatedText,
        audioUrl,
      },
      include: { region: { select: { id: true, name: true } } },
    });

    // 4. Trigger voice/SMS broadcast via IVR module
    let broadcastResult = null;
    try {
      const ivrUrl = process.env.IVR_SERVICE_URL || 'http://localhost:5002';
      const ivrRes = await fetch(`${ivrUrl}/api/ivr/history/${historyRecord.id}/broadcast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regionId: Number(regionId) }),
      });
      broadcastResult = await ivrRes.json();
      console.log('[IVR Dispatch Result]', broadcastResult);
    } catch (ivrErr) {
      console.error('[IVR Dispatch Error]', ivrErr.message);
    }

    res.json({ historyRecord, aiResult, broadcastResult });

  } catch (err) {
    // Mark as failed so the dashboard can surface it for retry
    await prisma.alertHistory.update({
      where: { id: historyRecord.id },
      data:  { status: 'failed' },
    });
    throw err; // Forwarded to the global error handler
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/alerts/:id/process  (admin only)
// Simplify + translate + extract from a raw alert, for preview purposes only.
// This is a dry run — nothing is written to alert_history here. A history
// record (and the community's audit trail) is only created once the alert
// is actually dispatched via POST /:id/dispatch.
// Body: { dialect }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:id/process', authenticate, requireAdmin, async (req, res) => {
  const { dialect } = req.body;

  if (!dialect) {
    return res.status(400).json({ error: 'dialect is required' });
  }

  const alert = await prisma.alert.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!alert) return res.status(404).json({ error: 'Alert not found' });

  const aiResult = await processAlert({
    raw_alert:      alert.rawScientificDescription,
    target_dialect: dialect,
    severity_level: alert.severityLevel,
  });

  res.json({
    simplifiedText:   aiResult.simplified_en,
    translatedText:   aiResult.translated_text ?? aiResult.translatedText,
    needsHumanReview: aiResult.needs_human_review ?? false,
    aiResult,
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/alerts/:id/generate-audio  (admin only)
// Translated text → playable audio file, for preview purposes only. Takes the
// translated text straight from the request body (the admin's most recent
// simplify/translate preview) instead of reading it back from a persisted
// record — nothing is written to alert_history here, same as /:id/process.
// Body: { dialect, translatedText }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:id/generate-audio', authenticate, requireAdmin, async (req, res) => {
  const { dialect, translatedText } = req.body;

  if (!dialect || !translatedText) {
    return res.status(400).json({
      error: 'dialect and translatedText are required. Run the simplify/translate step first.',
    });
  }

  const audioResult = await generateAudio({
    alert_result: { target_dialect: dialect, translated_text: translatedText },
    alert_id:     `${req.params.id}_preview_${Date.now()}`,
  });

  let audioUrl = null;
  if (audioResult.audio_path) {
    const filename = audioResult.audio_path.replace(/\\/g, '/').split('/').pop();
    audioUrl = `/audio/${filename}`;
  }

  if (!audioUrl) {
    return res.status(502).json({ error: audioResult.audio_note || 'Audio generation did not return a file.' });
  }

  res.json({ audioUrl, audioResult });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/alerts/:id/audio/:dialect
// Serves the audio file directly or redirects to it — used by IVR team
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id/audio/:dialect', async (req, res) => {
  const historyRecord = await prisma.alertHistory.findFirst({
    where: {
      alertId: Number(req.params.id),
      dialect: req.params.dialect,
      status:  'dispatched',
      audioUrl: { not: null },
    },
    orderBy: { dispatchedAt: 'desc' },
  });

  if (!historyRecord || !historyRecord.audioUrl) {
    return res.status(404).json({ error: 'Audio file not found for this alert and dialect.' });
  }

  // Redirect to the static file server path (e.g. /audio/filename.wav)
  res.redirect(historyRecord.audioUrl);
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/alerts/:id  (admin only)
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  await prisma.alert.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;

