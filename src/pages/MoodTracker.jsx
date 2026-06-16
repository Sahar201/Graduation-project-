import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MoodSelector from '../components/MoodSelector.jsx';
import MoodChart from '../components/MoodChart.jsx';
import TrashIcon from '../components/TrashIcon.jsx';
import { getMoods, createMood, deleteMood } from '../services/moodService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { MOOD_MAP } from '../data/moods.js';
import styles from '../styles/MoodTracker.module.css';

const NOTE_LIMIT = 500;

/** Time-of-day greeting. */
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const dayKey = (d) => new Date(d).toISOString().slice(0, 10);

/** Build a 7-day trend (oldest → newest) from a list of mood entries. */
const buildTrend = (moods) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - 6);

  const trend = [];
  for (let i = 0; i < 7; i += 1) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    const key = dayKey(day);
    const entries = moods.filter((m) => dayKey(m.date) === key);

    let score = null;
    let mood = null;
    if (entries.length) {
      const sum = entries.reduce((acc, m) => acc + (MOOD_MAP[m.mood]?.score || 0), 0);
      score = Math.round((sum / entries.length) * 10) / 10;
      mood = entries[entries.length - 1].mood;
    }

    trend.push({
      label: day.toLocaleDateString('en-US', { weekday: 'short' }),
      score,
      mood,
    });
  }
  return trend;
};

const formatEntryDate = (iso) => {
  const date = new Date(iso);
  const today = new Date();
  const yest = new Date();
  yest.setDate(today.getDate() - 1);
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  if (dayKey(date) === dayKey(today)) return `Today • ${time}`;
  if (dayKey(date) === dayKey(yest)) return `Yesterday • ${time}`;
  return `${date.toLocaleDateString('en-US', { weekday: 'long' })} • ${time}`;
};

const NOTE_PREVIEW_LEN = 160;

/** A single journal entry with a "Read more" toggle for long reflections. */
const JournalEntry = ({ entry, onDelete, deleting }) => {
  const [expanded, setExpanded] = useState(false);
  const meta = MOOD_MAP[entry.mood];
  const note = entry.note || '';
  const isLong = note.length > NOTE_PREVIEW_LEN;
  const shown = expanded || !isLong ? note : `${note.slice(0, NOTE_PREVIEW_LEN).trim()}… `;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className={styles.journalItem}
    >
      <span
        className={styles.journalEmoji}
        style={{ backgroundColor: `${meta?.color}26` }}
      >
        {meta?.emoji}
      </span>
      <div className={styles.journalBody}>
        <div className={styles.journalMeta}>
          <span className={styles.journalMood}>{entry.mood}</span>
          <time>{formatEntryDate(entry.date)}</time>
        </div>
        {note && (
          <p className={styles.journalNote}>
            {shown}
            {isLong && (
              <button
                type="button"
                className={styles.readMore}
                onClick={() => setExpanded((e) => !e)}
              >
                {expanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </p>
        )}
      </div>
      <button
        className={styles.deleteBtn}
        onClick={() => onDelete(entry._id)}
        disabled={deleting}
        aria-label="Delete entry"
      >
        <TrashIcon size={15} />
      </button>
    </motion.li>
  );
};

/**
 * Mood Tracker — the user's personal wellbeing space:
 * greeting, daily check-in, 7-day emotional trend, and a recent journal.
 */
const MoodTracker = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    try {
      const data = await getMoods();
      setMoods(data);
    } catch (error) {
      toast.error(error.message || 'Could not load your moods');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedMood) {
      toast.error('Please choose how you feel first');
      return;
    }
    setSaving(true);
    try {
      await createMood({ mood: selectedMood, note: note.trim() });
      toast.success("Today's mood saved 🌱");
      setSelectedMood('');
      setNote('');
      await load();
    } catch (error) {
      toast.error(error.message || 'Could not save your mood');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteMood(id);
      setMoods((prev) => prev.filter((m) => m._id !== id));
      toast.success('Entry removed');
    } catch (error) {
      toast.error(error.message || 'Could not remove entry');
    } finally {
      setDeletingId(null);
    }
  };

  const trend = buildTrend(moods);
  const hasTrend = trend.some((d) => d.score != null);
  const journal = moods.slice(0, 12);

  // Entries logged in the last 7 days.
  const weekStart = new Date();
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(weekStart.getDate() - 6);
  const weeklyCount = moods.filter((m) => new Date(m.date) >= weekStart).length;

  if (loading) {
    return (
      <div className="page">
        <div className="spinner-page" aria-label="Loading your mood tracker" />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        {/* ---------------------- Greeting banner ---------------------- */}
        <motion.section
          className={styles.greetingBanner}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className={styles.greetingText}>
            <h1>
              {getGreeting()}, {user?.name?.split(' ')[0] || 'friend'}.
            </h1>
            <p>
              How are you feeling today? Your journey to wellness is a marathon,
              not a sprint. We are here to listen.
            </p>
          </div>
          <div className={styles.greetingIcon} aria-hidden="true">
            <img
              src="/images/mood tracker.jpg"
              alt=""
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <i className="fa-solid fa-seedling" />
          </div>
        </motion.section>

        {/* ---------------------- Daily check-in ---------------------- */}
        <section className={styles.checkin}>
          <h2 className={styles.checkinTitle}>Daily Check-in</h2>
          <p className={styles.checkinSub}>How's your mood right now?</p>

          <form onSubmit={handleSave}>
            <MoodSelector value={selectedMood} onSelect={setSelectedMood} />

            <label className={styles.noteLabel} htmlFor="note">
              Any thoughts you'd like to capture?
            </label>
            <textarea
              id="note"
              className={styles.textarea}
              placeholder="Write a short reflection…"
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, NOTE_LIMIT))}
              rows={4}
            />
            <div className={styles.counter}>
              {note.length}/{NOTE_LIMIT}
            </div>

            <div className={styles.saveRow}>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? (
                  <span className="spinner" />
                ) : (
                  <>
                    <i className="fa-solid fa-heart" /> Save today's mood
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* ---------------------- Trends + journal ---------------------- */}
        <div className={styles.lower}>
          {/* Emotional trends */}
          <section className={styles.panel}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Emotional Trends</h2>
              <span className={styles.pill}>Last 7 Days</span>
            </div>

            <div className={styles.chartWrap}>
              {hasTrend ? (
                <MoodChart trend={trend} />
              ) : (
                <div className={styles.emptyChart}>
                  <i className="fa-regular fa-chart-bar" />
                  <p>Log a few moods to see your weekly trend appear here.</p>
                </div>
              )}
            </div>
          </section>

          {/* Recent journal */}
          <section className={styles.panel}>
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Recent Journal</h2>
              <span className={styles.entryTotal}>{moods.length} total</span>
            </div>

            {journal.length === 0 ? (
              <div className={styles.emptyJournal}>
                <i className="fa-regular fa-pen-to-square" />
                <p>Your reflections will appear here once you check in.</p>
              </div>
            ) : (
              <>
                <ul className={styles.journalList}>
                  <AnimatePresence>
                    {journal.map((entry) => (
                      <JournalEntry
                        key={entry._id}
                        entry={entry}
                        onDelete={handleDelete}
                        deleting={deletingId === entry._id}
                      />
                    ))}
                  </AnimatePresence>
                </ul>
                <div className={styles.journalFooter}>
                  You've logged {weeklyCount} {weeklyCount === 1 ? 'entry' : 'entries'} this
                  week. Keep it up!
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
