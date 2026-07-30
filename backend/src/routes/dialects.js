import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/dialects
// Returns the supported dialects list so the frontend only offers what's active.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', authenticate, (req, res) => {
  res.json([
    'Somali',
    'Oromo',
    'Amharic',
    'Swahili',
    'Turkana'
  ]);
});

export default router;
