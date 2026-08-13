import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import regionsRoutes from './routes/regions.js';
import hazardTypesRoutes from './routes/hazardTypes.js';
import communitiesRoutes from './routes/communities.js';
import membersRoutes from './routes/members.js';
import dialectsRoutes from './routes/dialects.js';
import alertsRoutes from './routes/alerts.js';
import alertHistoryRoutes from './routes/alertHistory.js';
import feedbackRoutes from './routes/feedback.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────
// Accept a comma-separated FRONTEND_URL list so both the Vite dev server
// (5173) and any other local origin can be allowlisted without editing code.
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

// Serve TTS-generated .wav audio files so the IVR team can fetch them
// Files are written to ai/generated_audio/ by tts_client.py
const GENERATED_AUDIO_DIR = path.resolve(__dirname, '../../ai/generated_audio');
app.use('/audio', express.static(GENERATED_AUDIO_DIR));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',          authRoutes);
app.use('/api/regions',       regionsRoutes);
app.use('/api/hazard-types',  hazardTypesRoutes);
app.use('/api/communities',   communitiesRoutes);
app.use('/api/members',       membersRoutes);
app.use('/api/dialects',      dialectsRoutes);
app.use('/api/alerts',        alertsRoutes);
app.use('/api/alert-history', alertHistoryRoutes);
app.use('/api/feedback',      feedbackRoutes);

// Health check — useful for frontend/IVR teams to confirm the server is up
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'echo-resilience-api', timestamp: new Date().toISOString() });
});

// Catch-all for unknown routes
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Global Error Handler ──────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌍 Echo-Resilience API running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

export default app;
