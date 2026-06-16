import api from './api.js';
import { SKILLS, DAYS, EMOTION_ROWS } from '../data/diary.js';
import { getWeekStart, getWeekEnd, toISODate } from '../utils/week.js';

/* ---- Local helpers (shape of an empty week) ---- */

const emptyEmotionRows = () =>
  Array.from({ length: EMOTION_ROWS }, () => ({ name: '', ratings: DAYS.map(() => 0) }));

/** Build a blank week object (used before anything is saved). */
export const createEmptyWeek = (weekStart) => {
  const skills = {};
  SKILLS.forEach((s) => {
    skills[s] = DAYS.map(() => '');
  });
  return {
    weekStartDate: toISODate(weekStart),
    weekEndDate: toISODate(getWeekEnd(weekStart)),
    primaryEmotions: emptyEmotionRows(),
    secondaryEmotions: emptyEmotionRows(),
    skills,
    feltAfter: DAYS.map(() => ''),
    updatedAt: null,
  };
};

/** True when a week contains anything worth saving. */
export const weekHasData = (week) => {
  const anyEmotion = (rows) =>
    rows.some((r) => r.name.trim() !== '' || r.ratings.some((v) => v > 0));
  const anySkill = Object.values(week.skills).some((d) => d.some((v) => v === 'Y' || v === 'N'));
  const anyFelt = week.feltAfter.some((v) => v);
  return anyEmotion(week.primaryEmotions) || anyEmotion(week.secondaryEmotions) || anySkill || anyFelt;
};

/* ---- API calls ---- */

/** Load a week from the API; returns a blank week if none is saved. */
export const loadWeek = async (weekStart) => {
  const id = toISODate(getWeekStart(weekStart));
  try {
    const { data } = await api.get(`/diary/${id}`);
    return data;
  } catch {
    return createEmptyWeek(weekStart);
  }
};

/** Create or update the week (upsert). */
export const saveWeek = async (week) => {
  const { data } = await api.post('/diary', week);
  return data;
};

/** All saved weeks, newest first. */
export const getWeeks = async () => {
  const { data } = await api.get('/diary');
  return data;
};

/** Delete a saved week by its start date. */
export const deleteWeek = async (weekId) => {
  const { data } = await api.delete(`/diary/${weekId}`);
  return data;
};
