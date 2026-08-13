import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/communities?regionId=1
router.get('/', authenticate, async (req, res) => {
  const { regionId } = req.query;

  const communities = await prisma.community.findMany({
    where: regionId ? { regionId: Number(regionId) } : undefined,
    include: { region: { select: { id: true, name: true } } },
    orderBy: { name: 'asc' },
  });

  res.json(communities);
});

// POST /api/communities  (admin only)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  const { name, regionId, totalRegistered, type, leaderPhone, source, status, actions } = req.body;

  if (!name || !regionId) {
    return res.status(400).json({ error: 'name and regionId are required' });
  }

  const community = await prisma.community.create({
    data: {
      name,
      regionId: Number(regionId),
      totalRegistered: totalRegistered ?? 0,
      type,
      leaderPhone,
      source,
      status: status ?? 'active',
      actions,
    },
    include: { region: { select: { id: true, name: true } } },
  });

  res.status(201).json(community);
});

// PATCH /api/communities/:id  (admin only)
router.patch('/:id', authenticate, requireAdmin, async (req, res) => {
  const { name, totalRegistered, type, leaderPhone, source, status, actions } = req.body;

  const community = await prisma.community.update({
    where: { id: Number(req.params.id) },
    data: { name, totalRegistered, type, leaderPhone, source, status, actions },
    include: { region: { select: { id: true, name: true } } },
  });

  res.json(community);
});

// DELETE /api/communities/:id  (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  await prisma.community.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;
