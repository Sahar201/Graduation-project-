import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import contentRoutes from './routes/content.js';
import authRoutes from './routes/auth.js';
import moodRoutes from './routes/moods.js';
import diaryRoutes from './routes/diary.js';
import dashboardRoutes from './routes/dashboard.js';
import { withDb, notFound, errorHandler } from './middleware/error.js';

/**
 * YouMatter API (Express).
 * - Articles & videos are read-only content (no database needed).
 * - Accounts, moods and diary cards use MongoDB; those routes connect to the
 *   database on demand via `withDb` (works locally and as a Vercel function).
 */
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) =>
  res.json({ status: 'ok', message: 'YouMatter API is running' })
);

// Content (no DB)
app.use('/api', contentRoutes);

// Database-backed
app.use('/api/auth', withDb, authRoutes);
app.use('/api/moods', withDb, moodRoutes);
app.use('/api/diary', withDb, diaryRoutes);
app.use('/api/dashboard', withDb, dashboardRoutes);

app.use('/api', notFound);
app.use(errorHandler);

export default app;
