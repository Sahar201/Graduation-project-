/**
 * The five tracked moods, matching the Mood Tracker design.
 * `score` (1–5) is used to plot the emotional-trend chart; `color` tints the
 * mood button and its bar in the chart.
 */
export const MOODS = [
  { value: 'Very Happy', emoji: '😄', label: 'Very Happy', color: '#E2A53C', score: 5 },
  { value: 'Happy', emoji: '🙂', label: 'Happy', color: '#4A9B8E', score: 4 },
  { value: 'Neutral', emoji: '😐', label: 'Neutral', color: '#9AA5A1', score: 3 },
  { value: 'Sad', emoji: '😢', label: 'Sad', color: '#6F9BD1', score: 2 },
  { value: 'Anxious', emoji: '😟', label: 'Anxious', color: '#D98E5A', score: 1 },
];

/** Quick lookup from a mood value to its display metadata. */
export const MOOD_MAP = MOODS.reduce((acc, mood) => {
  acc[mood.value] = mood;
  return acc;
}, {});

/** Map score → label, used for chart axis ticks and tooltips. */
export const SCORE_LABELS = MOODS.reduce((acc, mood) => {
  acc[mood.score] = mood.label;
  return acc;
}, {});
