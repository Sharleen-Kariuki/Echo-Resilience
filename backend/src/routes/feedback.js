import { Router } from 'express';
import path from 'path';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';
import { transcribeFeedback } from '../services/aiService.js';

const router = Router();

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/feedback?alertHistoryId=1&regionId=2&page=1&limit=20
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', authenticate, async (req, res) => {
  const { alertHistoryId, regionId, hazardTypeId, page = 1, limit = 20 } = req.query;

  const where = {};
  if (alertHistoryId) where.alertHistoryId = Number(alertHistoryId);
  if (regionId)       where.regionId       = Number(regionId);
  if (hazardTypeId)   where.hazardTypeId   = Number(hazardTypeId);

  const [logs, total] = await Promise.all([
    prisma.feedbackLog.findMany({
      where,
      include: {
        alertHistory: { select: { id: true, dialect: true, status: true } },
        region:       { select: { id: true, name: true } },
        hazardType:   { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    }),
    prisma.feedbackLog.count({ where }),
  ]);

  res.json({ logs, total, page: Number(page), limit: Number(limit) });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/feedback
// Called by the IVR team's Africa's Talking webhook handler after a call ends.
// No auth required — the IVR system calls this from server-side.
// ─────────────────────────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  const { alertHistoryId, regionId, hazardTypeId, audioFeedbackUrl, translationText } = req.body;

  if (!alertHistoryId || !regionId || !hazardTypeId) {
    return res.status(400).json({
      error: 'alertHistoryId, regionId, and hazardTypeId are required',
    });
  }

  const log = await prisma.feedbackLog.create({
    data: {
      alertHistoryId: Number(alertHistoryId),
      regionId:       Number(regionId),
      hazardTypeId:   Number(hazardTypeId),
      audioFeedbackUrl,
      translationText,
    },
    include: {
      region:     { select: { id: true, name: true } },
      hazardType: { select: { id: true, name: true } },
    },
  });

  res.status(201).json(log);
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/feedback/:id/process
// Recorded feedback call → transcript + English translation + hazard guess
// Body: { audio_local_path, dialect_hint }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:id/process', async (req, res) => {
  const { audio_local_path, dialect_hint } = req.body;
  const feedbackId = Number(req.params.id);

  const log = await prisma.feedbackLog.findUnique({
    where: { id: feedbackId },
  });
  if (!log) return res.status(404).json({ error: 'Feedback log not found' });

  // Resolve input path — check body or the database URL
  let filePath = audio_local_path || log.audioFeedbackUrl;
  if (!filePath) {
    return res.status(400).json({
      error: 'No audio path provided in body, and no audio_feedback_url is recorded in database.',
    });
  }

  // If path is absolute, use it. If not, resolve it relative to the 'ai' directory
  // since the python subprocess runs from that directory context
  if (!path.isAbsolute(filePath)) {
    // If it starts with /audio/, convert it to the actual generated_audio directory path
    if (filePath.startsWith('/audio/')) {
      const filename = filePath.split('/').pop();
      filePath = path.join('generated_audio', filename);
    }
  }

  const result = await transcribeFeedback({
    audio_file_path: filePath,
    dialect_hint,
  });

  // Update feedback log. If hazard_type is predicted and matches a db hazard, update it.
  let hazardTypeId = log.hazardTypeId;
  if (result.hazard_type && result.hazard_type.toLowerCase() !== 'none') {
    const matchedHazard = await prisma.hazardType.findFirst({
      where: {
        name: { equals: result.hazard_type, mode: 'insensitive' },
      },
    });
    if (matchedHazard) {
      hazardTypeId = matchedHazard.id;
    }
  }

  const updatedLog = await prisma.feedbackLog.update({
    where: { id: feedbackId },
    data: {
      translationText: result.translated_text || result.translation_text,
      hazardTypeId,
    },
    include: {
      region:     { select: { id: true, name: true } },
      hazardType: { select: { id: true, name: true } },
    },
  });

  res.json({ feedbackLog: updatedLog, aiResult: result });
});

export default router;

