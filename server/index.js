import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';

/**
 * Local development entry point. Starts the Express API on PORT (default 5000).
 * Vite proxies /api here in dev. On Vercel, api/index.js is used instead.
 */
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) =>
    console.warn(
      `⚠️  MongoDB not connected (${err.message}). Articles & videos still work; ` +
        'login, moods and diary need a valid MONGO_URI in .env.'
    )
  );

app.listen(PORT, () => console.log(`🚀 YouMatter API on http://localhost:${PORT}`));
