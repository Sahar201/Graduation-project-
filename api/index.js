/**
 * Vercel serverless entry point.
 * Vercel turns files in /api into serverless functions. We re-export the
 * Express app; `vercel.json` rewrites every /api/* request to this function.
 */
import app from '../server/app.js';

export default app;
