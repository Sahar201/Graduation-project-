/**
 * Helpers for working with Monday–Sunday weeks.
 */

/** Local YYYY-MM-DD string for a date (no timezone surprises). */
export const toISODate = (date) => {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

/** Monday (00:00) of the week containing `date`. */
export const getWeekStart = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0 = Sun, 1 = Mon, …
  const diff = day === 0 ? -6 : 1 - day; // shift back to Monday
  d.setDate(d.getDate() + diff);
  return d;
};

/** Sunday (00:00) of the same week. */
export const getWeekEnd = (weekStart) => {
  const d = new Date(weekStart);
  d.setDate(d.getDate() + 6);
  return d;
};

/** Shift a week start by `n` weeks (can be negative). */
export const addWeeks = (weekStart, n) => {
  const d = new Date(weekStart);
  d.setDate(d.getDate() + n * 7);
  return d;
};

/** "Week of June 9 – June 15" (month omitted on the end date if the same). */
export const formatWeekRange = (weekStart) => {
  const start = new Date(weekStart);
  const end = getWeekEnd(weekStart);
  const startStr = start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const sameMonth = start.getMonth() === end.getMonth();
  const endStr = end.toLocaleDateString('en-US', {
    month: sameMonth ? undefined : 'long',
    day: 'numeric',
  });
  return `Week of ${startStr} – ${endStr}`;
};

/** True when the given week start is the current calendar week. */
export const isCurrentWeek = (weekStart) =>
  toISODate(weekStart) === toISODate(getWeekStart(new Date()));
