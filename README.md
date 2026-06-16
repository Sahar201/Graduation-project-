# YouMatter — A Mental Health Website

> _You don't have to face it alone._

YouMatter is a calm, supportive web app for mental wellbeing. Read curated
articles, follow guided breathing and mindful videos, track your mood over time,
and watch your emotional trends unfold.

## 🧩 How it's built (full-stack MERN, deployable on Vercel)

- **Frontend:** React 18 + Vite, React Router, CSS Modules, Framer Motion, Chart.js.
- **Backend:** **Express** REST API (`server/`) with **JWT** auth (bcrypt-hashed
  passwords). Articles & videos are served from the API; accounts, mood entries
  and diary cards are stored in **MongoDB** (Mongoose).
- **Deployment:** runs on **Vercel** — the React app is static and the Express
  API runs as a **serverless function** (`api/index.js`), backed by **MongoDB
  Atlas** (free tier). Set `MONGO_URI` and `JWT_SECRET` as Vercel env vars.
- Articles & videos have a built-in fallback, so the library still shows even if
  the API is unreachable.

### API endpoints
`POST /api/auth/register · /login · /reset-password`, `GET /api/auth/me`,
`GET /api/articles[/:id]`, `GET /api/videos[/:id]`,
`POST|GET /api/moods`, `DELETE /api/moods/:id`, `GET /api/dashboard`,
`POST|GET /api/diary`, `GET|DELETE /api/diary/:weekId`.

## ✨ Features

- **Home** — hero, supportive tools, and a quote carousel (20s autoplay, fade/slide, prev/next, pause-on-hover).
- **Articles** — preview cards with animated category filtering; **Read More opens a dedicated article page** with a Back button and Related Articles.
- **Videos & Exercises** — a guided breathing exercise plus a filterable library; videos **play in an in-site modal** with an embedded player and real thumbnails (never leaves the site).
- **Auth** — register & login with validation, loading states and toast feedback.
- **Mood Tracker** — greeting, daily 5-mood check-in with a reflection note, a 7-day emotional-trend bar chart, and a recent journal.
- **Diary Card** — weekly emotion + skills tracker with autosave and past-week history.
- Fully responsive (320 → 1440px), accessible, soft shadows, smooth transitions.

## 📁 Structure

```
You-matter/
├── public/
│   └── images/           ← drop your images here (see images/README.md)
├── src/
│   ├── components/        Navbar, cards, BreathingCircle, MoodChart, VideoModal, …
│   ├── context/           Auth + Toast providers
│   ├── data/              articles, videos, quotes, moods, diary options
│   ├── pages/             Home, Articles, ArticleDetail, Videos, Login, MoodTracker, DiaryCard, …
│   ├── services/          localStorage-backed auth / moods / diary + content helpers
│   ├── utils/             YouTube + week-date helpers
│   └── styles/            Global CSS + CSS Modules
├── server/                Express API
│   ├── config/db.js       Cached MongoDB connection (serverless-friendly)
│   ├── models/            User, Mood, DiaryCard (Mongoose)
│   ├── controllers/       auth, content, mood, diary
│   ├── routes/            auth, content, moods, diary, dashboard
│   ├── data/              articles, videos (served by the API)
│   ├── app.js             Express app
│   └── index.js           Local dev server
├── api/index.js           Vercel serverless entry (exports the Express app)
├── index.html
├── vite.config.js         Dev: proxies /api → the Express server
├── vercel.json            Routes /api → function, everything else → the SPA
└── package.json
```

## 🚀 Run it locally (VS Code)

Requires [Node.js](https://nodejs.org) 18+ and a MongoDB connection string
(free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster recommended).

```bash
cp .env.example .env       # then put your MONGO_URI + JWT_SECRET in .env
npm install                # install once
npm run dev                # runs the API (port 5000) AND the app (port 5173)
```

Open **http://localhost:5173**. Articles & videos work even without a database;
login, moods and diary need a valid `MONGO_URI`.

## ☁️ Deploy to Vercel (with MongoDB Atlas)

1. Create a free **MongoDB Atlas** cluster → add a database user → allow access
   from anywhere (`0.0.0.0/0`) → copy the connection string.
2. Push this project to GitHub.
3. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
4. Before deploying, open **Settings → Environment Variables** and add:
   - `MONGO_URI` = your Atlas connection string
   - `JWT_SECRET` = any long random string
5. Click **Deploy**. The React app is served statically and `/api/*` runs as a
   serverless function connected to your database.

> Without `MONGO_URI`, the deployed site still shows articles & videos, but
> login / moods / diary won't work until the database env vars are set.

## ✏️ Customizing content & images

- **Article text / video links:** edit `server/data/articles.js` and `server/data/videos.js` (the API serves these; `src/data/*` are the offline fallback copies).
- **Images:** drop files into `public/images/` using the names listed in
  [`public/images/README.md`](public/images/README.md). Missing images fall back
  to stock photos automatically.
- **Quotes:** edit `src/data/quotes.js`.
- **Colors / fonts:** all design tokens live in `src/styles/global.css`.

## ⚠️ A note on wellbeing

YouMatter is a supportive tool, not a substitute for professional care. If you
are in crisis, please contact a local helpline or emergency services. You matter.
