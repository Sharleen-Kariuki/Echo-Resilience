import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();
const includeRelations = { region: { select: { id: true, name: true } }, community: { select: { id: true, name: true } } };

// Read-only reach estimate for the alert composer. It intentionally counts
// actual active recipients instead of Community.totalRegistered, which is an
// aggregate and can become stale.
router.get('/summary', authenticate, async (req, res) => {
  const regionIds = String(req.query.regionIds ?? '')
    .split(',')
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isInteger(value) && value > 0);

  if (regionIds.length === 0) {
    return res.json({ totalReachable: 0, byRegion: [], byLanguage: [] });
  }

  const [regions, members] = await Promise.all([
    prisma.region.findMany({ where: { id: { in: regionIds } }, select: { id: true, name: true } }),
    prisma.member.findMany({
      where: { regionId: { in: regionIds }, status: 'active', phone: { not: '' } },
      select: { regionId: true, language: true, phone: true },
    }),
  ]);

  // The UI normalizes phone numbers to E.164; retain the same rule server
  // side so the estimate does not include numbers the dispatcher cannot use.
  const reachable = members.filter((member) => /^\+\d{9,15}$/.test(member.phone));
  const regionCounts = new Map(reachable.map((member) => [member.regionId, 0]));
  const languageCounts = new Map();

  for (const member of reachable) {
    regionCounts.set(member.regionId, (regionCounts.get(member.regionId) ?? 0) + 1);
    languageCounts.set(member.language, (languageCounts.get(member.language) ?? 0) + 1);
  }

  res.json({
    totalReachable: reachable.length,
    byRegion: regions
      .map((region) => ({ regionId: region.id, regionName: region.name, reachable: regionCounts.get(region.id) ?? 0 }))
      .sort((a, b) => b.reachable - a.reachable || a.regionName.localeCompare(b.regionName)),
    byLanguage: [...languageCounts.entries()]
      .map(([language, reachable]) => ({ language, reachable }))
      .sort((a, b) => b.reachable - a.reachable || a.language.localeCompare(b.language)),
  });
});

router.get('/', authenticate, async (req, res) => {
  const { regionId, communityId } = req.query;
  const where = {
    ...(regionId ? { regionId: Number(regionId) } : {}),
    ...(communityId ? { communityId: Number(communityId) } : {}),
  };
  res.json(await prisma.member.findMany({ where, include: includeRelations, orderBy: { createdAt: 'desc' } }));
});

router.post('/', authenticate, requireAdmin, async (req, res) => {
  const { fullName, phone, language, locality, source, status, regionId, communityId } = req.body;
  if (!fullName || !phone || !language || !regionId) {
    return res.status(400).json({ error: 'fullName, phone, language, and regionId are required' });
  }
  const member = await prisma.member.create({
    data: { fullName, phone, language, locality, source, status: status ?? 'active', regionId: Number(regionId), communityId: communityId ? Number(communityId) : null },
    include: includeRelations,
  });
  res.status(201).json(member);
});

router.patch('/:id', authenticate, requireAdmin, async (req, res) => {
  const { fullName, phone, language, locality, source, status, regionId, communityId } = req.body;
  const data = Object.fromEntries(Object.entries({ fullName, phone, language, locality, source, status, regionId, communityId }).filter(([, value]) => value !== undefined));
  if (data.regionId !== undefined) data.regionId = Number(data.regionId);
  if (data.communityId !== undefined) data.communityId = data.communityId ? Number(data.communityId) : null;
  res.json(await prisma.member.update({ where: { id: Number(req.params.id) }, data, include: includeRelations }));
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  await prisma.member.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;
