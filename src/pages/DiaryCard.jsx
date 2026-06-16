import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../context/ToastContext.jsx';
import {
  PRIMARY_EMOTIONS,
  SECONDARY_EMOTIONS,
  SKILLS,
  DAYS,
  MAX_INTENSITY,
  FELT_AFTER,
} from '../data/diary.js';
import {
  createEmptyWeek,
  loadWeek,
  saveWeek,
  getWeeks,
  deleteWeek,
  weekHasData,
} from '../services/diaryService.js';
import {
  getWeekStart,
  addWeeks,
  formatWeekRange,
  isCurrentWeek,
  toISODate,
} from '../utils/week.js';
import TrashIcon from '../components/TrashIcon.jsx';
import styles from '../styles/DiaryCard.module.css';

const PRIMARY_COLOR = '#4A9B8E';
const SECONDARY_COLOR = '#8B7FD1';

/* ---- Small interactive cell components ---- */

const DotRating = ({ value, color, onChange, disabled }) => (
  <div className={styles.dots}>
    {Array.from({ length: MAX_INTENSITY }, (_, i) => i + 1).map((n) => {
      const on = n <= value;
      return (
        <button
          key={n}
          type="button"
          disabled={disabled}
          className={`${styles.dot} ${on ? styles.dotOn : ''}`}
          style={on ? { background: color, borderColor: color } : undefined}
          onClick={() => onChange(n === value ? 0 : n)}
          aria-label={`Intensity ${n}`}
        />
      );
    })}
    {value > 0 && <span className={styles.dotNum}>{value}</span>}
  </div>
);

const SkillCell = ({ value, onCycle, disabled }) => (
  <button
    type="button"
    disabled={disabled}
    className={`${styles.skill} ${
      value === 'Y' ? styles.skillYes : value === 'N' ? styles.skillNo : ''
    }`}
    onClick={onCycle}
    aria-label={value === 'Y' ? 'Used' : value === 'N' ? 'Not used' : 'Not set'}
  >
    {value === 'Y' ? '✓' : value === 'N' ? '✕' : ''}
  </button>
);

const FeltFace = ({ value, onCycle, disabled }) => {
  const face = FELT_AFTER.find((f) => f.value === value);
  return (
    <button
      type="button"
      disabled={disabled}
      className={`${styles.face} ${face ? styles.faceSet : ''}`}
      onClick={onCycle}
      title={face ? face.label : 'Tap to rate'}
      aria-label={face ? face.label : 'Not set'}
    >
      {face ? face.emoji : '·'}
    </button>
  );
};

const DiaryCard = () => {
  const toast = useToast();

  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const [week, setWeek] = useState(() => createEmptyWeek(getWeekStart(new Date())));
  const [readOnly, setReadOnly] = useState(false);
  const [history, setHistory] = useState([]);
  const [savedAt, setSavedAt] = useState(null);

  const dirty = useRef(false);
  const saveTimer = useRef(null);

  const refreshHistory = useCallback(async () => {
    try {
      setHistory(await getWeeks());
    } catch {
      /* not logged in / offline — leave history as is */
    }
  }, []);

  // Load the selected week from the API whenever it changes.
  useEffect(() => {
    let active = true;
    dirty.current = false;
    loadWeek(weekStart).then((w) => {
      if (active) {
        setWeek(w);
        setSavedAt(w.updatedAt || null);
      }
    });
    return () => {
      active = false;
    };
  }, [weekStart]);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const persist = useCallback(
    async (nextWeek, { silent } = {}) => {
      try {
        const saved = await saveWeek(nextWeek);
        setSavedAt(saved.updatedAt);
        refreshHistory();
        if (!silent) toast.success('Your week has been saved 🌿');
      } catch (error) {
        if (!silent) toast.error(error.message || 'Could not save your week');
      }
    },
    [refreshHistory, toast]
  );

  useEffect(() => {
    if (!dirty.current) return undefined;
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      if (weekHasData(week)) persist(week, { silent: true });
    }, 700);
    return () => window.clearTimeout(saveTimer.current);
  }, [week, persist]);

  const mutate = (mutator) => {
    dirty.current = true;
    setWeek((prev) => {
      const next = structuredClone(prev);
      mutator(next);
      return next;
    });
  };

  const setEmotionName = (group, row, value) =>
    mutate((w) => {
      w[group][row].name = value;
    });

  const setEmotionRating = (group, row, day, value) =>
    mutate((w) => {
      w[group][row].ratings[day] = value;
    });

  const addEmotionRow = (group) =>
    mutate((w) => {
      w[group].push({ name: '', ratings: DAYS.map(() => 0) });
    });

  const removeEmotionRow = (group, row) =>
    mutate((w) => {
      if (w[group].length > 1) {
        w[group].splice(row, 1);
      } else {
        // Keep at least one row — just clear it instead of removing.
        w[group][0] = { name: '', ratings: DAYS.map(() => 0) };
      }
    });

  const cycleSkill = (skill, day) =>
    mutate((w) => {
      const cur = w.skills[skill][day];
      w.skills[skill][day] = cur === '' ? 'Y' : cur === 'Y' ? 'N' : '';
    });

  const cycleFelt = (day) =>
    mutate((w) => {
      const order = ['', ...FELT_AFTER.map((f) => f.value)];
      const idx = order.indexOf(w.feltAfter[day]);
      w.feltAfter[day] = order[(idx + 1) % order.length];
    });

  const handleSaveClick = () => {
    window.clearTimeout(saveTimer.current);
    persist(week);
  };

  const goToWeek = (n) => {
    setReadOnly(false);
    setWeekStart((prev) => addWeeks(prev, n));
  };

  const viewHistoryWeek = (weekStartDate) => {
    setReadOnly(true);
    setWeekStart(getWeekStart(new Date(`${weekStartDate}T00:00:00`)));
  };

  const handleDeleteWeek = async (weekStartDate) => {
    if (!window.confirm('Delete this saved week? This cannot be undone.')) return;
    try {
      await deleteWeek(weekStartDate);
      toast.success('Saved week deleted');
      await refreshHistory();
      // If we were viewing the week we just deleted, reset it to a blank week.
      if (weekStartDate === week.weekStartDate) {
        setReadOnly(false);
        dirty.current = false;
        setWeek(createEmptyWeek(weekStart));
        setSavedAt(null);
      }
    } catch (error) {
      toast.error(error.message || 'Could not delete the week');
    }
  };

  // Column header dates + today highlight.
  const todayKey = toISODate(new Date());
  const dayMeta = DAYS.map((label, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return { label, date: d.getDate(), isToday: toISODate(d) === todayKey };
  });

  const renderDayHeader = () => (
    <div className={`${styles.row} ${styles.headerRow}`}>
      <div className={styles.rowLabel} />
      {dayMeta.map((d) => (
        <div key={d.label} className={styles.dayHead}>
          <span>{d.label}</span>
          <small className={d.isToday ? styles.today : ''}>{d.date}</small>
        </div>
      ))}
    </div>
  );

  const renderEmotionSection = (group, color, icon, title, subtitle) => (
    <>
      <div className={styles.sectionHead}>
        <span
          className={styles.sectionIcon}
          style={{ background: `${color}1f`, color }}
        >
          <i className={`fa-solid ${icon}`} />
        </span>
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>

      {week[group].map((rowData, row) => (
        <div className={styles.row} key={`${group}-${row}`}>
          <div className={styles.rowLabel}>
            <div className={styles.emotionField}>
              <input
                type="text"
                className={styles.emotionInput}
                value={rowData.name}
                placeholder="Type emotion…"
                onChange={(e) => setEmotionName(group, row, e.target.value)}
                disabled={readOnly}
              />
              {!readOnly && (
                <button
                  type="button"
                  className={styles.removeRow}
                  onClick={() => removeEmotionRow(group, row)}
                  aria-label="Remove this emotion"
                  title="Remove emotion"
                >
                  <TrashIcon size={15} />
                </button>
              )}
            </div>
          </div>
          {dayMeta.map((d, day) => (
            <div key={d.label} className={styles.cell}>
              <DotRating
                value={rowData.ratings[day]}
                color={color}
                onChange={(v) => setEmotionRating(group, row, day, v)}
                disabled={readOnly}
              />
            </div>
          ))}
        </div>
      ))}

      {!readOnly && (
        <button className={styles.addRow} onClick={() => addEmotionRow(group)}>
          <i className="fa-solid fa-plus" /> Add emotion
        </button>
      )}

      <div className={styles.legend}>
        <span className={styles.legendStrong}>Intensity — 1 means less, 5 means more:</span>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ background: color, opacity: 0.25 + n * 0.15 }}
            />
            {n === 1 ? '1 less' : n === 5 ? '5 more' : n}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <div className="page">
      <div className="container">
        <h1 className="section-title">Diary Card</h1>
        <p className="section-subtitle">
          A gentle, playful way to notice your feelings and the skills that help.
        </p>

        {/* Intro */}
        <motion.section
          className={styles.intro}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>
            We all go through moments where emotions feel too big to understand.
            This card is your safe space to put those feelings into words — find
            your feeling, rate how strong it is, mark which skill you used, and
            tell us if it helped.
          </p>
          <div className={styles.legendChips}>
            <div>
              <span className={styles.chipsLabel}>Primary examples</span>
              {PRIMARY_EMOTIONS.map((e) => (
                <span key={e} className={styles.chip}>{e}</span>
              ))}
            </div>
            <div>
              <span className={styles.chipsLabel}>Secondary examples</span>
              {SECONDARY_EMOTIONS.slice(0, 12).map((e) => (
                <span key={e} className={`${styles.chip} ${styles.chipAlt}`}>{e}</span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Week selector */}
        <div className={styles.weekBar}>
          <button className={styles.weekArrow} onClick={() => goToWeek(-1)} aria-label="Previous week">
            <i className="fa-solid fa-chevron-left" />
          </button>
          <div className={styles.weekLabel}>
            <i className="fa-regular fa-calendar" />
            <span>{formatWeekRange(weekStart)}</span>
            {isCurrentWeek(weekStart) && <span className={styles.thisWeek}>This week</span>}
          </div>
          <button className={styles.weekArrow} onClick={() => goToWeek(1)} aria-label="Next week">
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>

        {readOnly && (
          <div className={styles.readOnlyBanner}>
            <span><i className="fa-regular fa-eye" /> Viewing a past week (read only).</span>
            <button className={styles.editBtn} onClick={() => setReadOnly(false)}>
              <i className="fa-solid fa-pen" /> Edit this week
            </button>
          </div>
        )}

        {/* Board */}
        <div className={styles.board}>
          <div className={styles.grid}>
            {renderDayHeader()}

            {renderEmotionSection(
              'primaryEmotions',
              PRIMARY_COLOR,
              'fa-heart',
              'Primary emotions',
              'Type your emotion, then rate it — 1 means less, 5 means more.'
            )}

            {renderEmotionSection(
              'secondaryEmotions',
              SECONDARY_COLOR,
              'fa-layer-group',
              'Secondary emotions',
              'The feelings underneath — write anything, then rate it 1 (less) to 5 (more).'
            )}

            {/* Skills */}
            <div className={styles.sectionHead}>
              <span
                className={styles.sectionIcon}
                style={{ background: 'rgba(74,155,142,0.12)', color: PRIMARY_COLOR }}
              >
                <i className="fa-solid fa-toolbox" />
              </span>
              <div>
                <h3>Skills used</h3>
                <p>Tap each day — shows ✓ when used, ✕ when not.</p>
              </div>
            </div>
            {SKILLS.map((skill) => (
              <div className={styles.row} key={skill}>
                <div className={styles.rowLabel}>{skill}</div>
                {dayMeta.map((d, day) => (
                  <div key={d.label} className={styles.cell}>
                    <SkillCell
                      value={week.skills[skill][day]}
                      onCycle={() => cycleSkill(skill, day)}
                      disabled={readOnly}
                    />
                  </div>
                ))}
              </div>
            ))}

            {/* Felt after */}
            <div className={styles.sectionHead}>
              <span
                className={styles.sectionIcon}
                style={{ background: 'rgba(212,168,83,0.16)', color: 'var(--color-accent-dark)' }}
              >
                <i className="fa-solid fa-wand-magic-sparkles" />
              </span>
              <div>
                <h3>How I felt after using skills</h3>
                <p>Tap the face that matches how you felt after.</p>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowLabel}>Tap to rate</div>
              {dayMeta.map((d, day) => (
                <div key={d.label} className={styles.cell}>
                  <FeltFace
                    value={week.feltAfter[day]}
                    onCycle={() => cycleFelt(day)}
                    disabled={readOnly}
                  />
                </div>
              ))}
            </div>
            <div className={styles.legend}>
              {FELT_AFTER.map((f) => (
                <span key={f.value} className={styles.legendItem}>
                  <span className={styles.faceMini}>{f.emoji}</span> {f.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Save */}
        <div className={styles.saveBar}>
          <span className={styles.savedNote}>
            {savedAt ? (
              <>
                <i className="fa-solid fa-cloud-arrow-up" /> Saved automatically ·{' '}
                {new Date(savedAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </>
            ) : (
              <><i className="fa-regular fa-floppy-disk" /> Changes save automatically.</>
            )}
          </span>
          {!readOnly && (
            <button className="btn btn-primary" onClick={handleSaveClick}>
              <i className="fa-solid fa-heart" /> Save this week
            </button>
          )}
        </div>

        {/* History */}
        <section className={styles.history}>
          <h2 className={styles.historyTitle}>Past Weeks</h2>
          {history.length === 0 ? (
            <p className={styles.historyEmpty}>
              Your saved weeks will appear here once you start tracking.
            </p>
          ) : (
            <div className={styles.historyList}>
              {history.map((w) => {
                const active = w.weekStartDate === week.weekStartDate;
                return (
                  <div
                    key={w.weekStartDate}
                    className={`${styles.historyItem} ${active ? styles.historyActive : ''}`}
                  >
                    <button
                      className={styles.historyView}
                      onClick={() => viewHistoryWeek(w.weekStartDate)}
                    >
                      <span className={styles.historyRange}>
                        <i className="fa-regular fa-calendar-check" />
                        {formatWeekRange(new Date(`${w.weekStartDate}T00:00:00`))}
                      </span>
                      <i className="fa-solid fa-arrow-right" />
                    </button>
                    <button
                      className={styles.historyDelete}
                      onClick={() => handleDeleteWeek(w.weekStartDate)}
                      aria-label="Delete this saved week"
                      title="Delete week"
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DiaryCard;
