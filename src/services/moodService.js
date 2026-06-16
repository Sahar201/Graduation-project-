import api from './api.js';

/** Create a mood entry. */
export const createMood = async ({ mood, note }) => {
  const { data } = await api.post('/moods', { mood, note });
  return data;
};

/** Get the user's mood entries (newest first). */
export const getMoods = async (limit) => {
  const params = limit ? { limit } : {};
  const { data } = await api.get('/moods', { params });
  return data;
};

/** Delete a mood entry by id. */
export const deleteMood = async (id) => {
  const { data } = await api.delete(`/moods/${id}`);
  return data;
};

/** Aggregated dashboard data (7-day trend, recent entries, totals). */
export const getDashboard = async () => {
  const { data } = await api.get('/dashboard');
  return data;
};
