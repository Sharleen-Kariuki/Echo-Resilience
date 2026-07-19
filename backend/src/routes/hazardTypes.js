import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/hazard-types
router.get('/', authenticate, async (req, res) => {
  const hazardTypes = await prisma.hazardType.findMany({ orderBy: { name: 'asc' } });
  res.json(hazardTypes);
});

// POST /api/hazard-types  (admin only)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });

  const hazardType = await prisma.hazardType.create({ data: { name } });
  res.status(201).json(hazardType);
});

export default router;
