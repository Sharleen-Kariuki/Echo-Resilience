import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/alert-history?alertId=1&regionId=2&status=dispatched&page=1&limit=20
// Used by the frontend dashboard to show dispatch history and the IVR team to
// find the right audio URL for a given alert + dialect.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', authenticate, async (req, res) => {
  const { alertId, regionId, status, dialect, page = 1, limit = 20 } = req.query;

  const where = {};
  if (alertId)  where.alertId  = Number(alertId);
  if (regionId) where.regionId = Number(regionId);
  if (status)   where.status   = status;
  if (dialect)  where.dialect  = dialect;

  const [records, total] = await Promise.all([
    prisma.alertHistory.findMany({
      where,
      include: {
        alert:  { include: { hazardType: { select: { id: true, name: true } } } },
        region: { select: { id: true, name: true } },
      },
      orderBy: { dispatchedAt: 'desc' },
      skip:  (Number(page) - 1) * Number(limit),
      take:  Number(limit),
    }),
    prisma.alertHistory.count({ where }),
  ]);

  res.json({ records, total, page: Number(page), limit: Number(limit) });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/alert-history/:id  — single record with feedback logs
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id', authenticate, async (req, res) => {
  const record = await prisma.alertHistory.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      alert: {
        include: {
          hazardType:   true,
          alertRegions: { include: { region: true } },
        },
      },
      region:      true,
      feedbackLogs: true,
    },
  });

  if (!record) return res.status(404).json({ error: 'Alert history record not found' });
  res.json(record);
});

export default router;
