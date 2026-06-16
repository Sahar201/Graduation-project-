import { validationResult } from 'express-validator';
import Mood from '../models/Mood.js';

const MOOD_SCORES = { 'Very Happy': 5, Happy: 4, Neutral: 3, Sad: 2, Anxious: 1 };

/** POST /api/moods */
export const createMood = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
    const { mood, note } = req.body;
    const entry = await Mood.create({ userId: req.user._id, mood, note: note || '', date: new Date() });
    return res.status(201).json(entry);
  } catch (error) {
    return next(error);
  }
};

/** GET /api/moods */
export const getMoods = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 100);
    const moods = await Mood.find({ userId: req.user._id }).sort({ date: -1 }).limit(limit);
    return res.json(moods);
  } catch (error) {
    return next(error);
  }
};

/** DELETE /api/moods/:id */
export const deleteMood = async (req, res, next) => {
  try {
    const entry = await Mood.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Mood entry not found' });
    if (entry.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await entry.deleteOne();
    return res.json({ message: 'Mood entry deleted', id: req.params.id });
  } catch (error) {
    return next(error);
  }
};

/** GET /api/dashboard — 7-day trend + recent entries. */
export const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - 6);

    const recent = await Mood.find({ userId, date: { $gte: start } }).sort({ date: 1 });
    const trend = [];
    for (let i = 0; i < 7; i += 1) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      const key = day.toISOString().slice(0, 10);
      const entries = recent.filter((m) => m.date.toISOString().slice(0, 10) === key);
      let score = null;
      if (entries.length) {
        const sum = entries.reduce((acc, m) => acc + (MOOD_SCORES[m.mood] || 0), 0);
        score = Math.round((sum / entries.length) * 10) / 10;
      }
      trend.push({
        date: key,
        label: day.toLocaleDateString('en-US', { weekday: 'short' }),
        score,
        mood: entries.length ? entries[entries.length - 1].mood : null,
      });
    }
    const latest = await Mood.find({ userId }).sort({ date: -1 }).limit(5);
    const total = await Mood.countDocuments({ userId });
    return res.json({ user: { id: userId, name: req.user.name }, trend, recentMoods: latest, totalEntries: total });
  } catch (error) {
    return next(error);
  }
};
