import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/regions
router.get('/', authenticate, async (req, res) => {
  const regions = await prisma.region.findMany({ orderBy: { name: 'asc' } });
  res.json(regions);
});

// POST /api/regions  (admin only)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  const { name, latitude, longitude } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });

  const region = await prisma.region.create({
    data: {
      name,
      latitude: latitude !== undefined ? Number(latitude) : undefined,
      longitude: longitude !== undefined ? Number(longitude) : undefined,
    },
  });
  res.status(201).json(region);
});

export default router;
