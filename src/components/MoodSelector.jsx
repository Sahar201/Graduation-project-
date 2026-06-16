import { MOODS } from '../data/moods.js';
import styles from '../styles/MoodSelector.module.css';

/**
 * Row of mood options, each an emoji inside a soft colored circle with a label.
 * Controlled component: pass the selected `value` and an `onSelect(value)`.
 */
const MoodSelector = ({ value, onSelect }) => {
  return (
    <div className={styles.grid} role="radiogroup" aria-label="Select your mood">
      {MOODS.map((mood) => {
        const selected = value === mood.value;
        return (
          <button
            key={mood.value}
            type="button"
            role="radio"
            aria-checked={selected}
            className={`${styles.mood} ${selected ? styles.selected : ''}`}
            onClick={() => onSelect(mood.value)}
          >
            <span
              className={styles.circle}
              style={{
                backgroundColor: `${mood.color}26`, // ~15% tint
                boxShadow: selected ? `0 0 0 3px ${mood.color}` : 'none',
              }}
            >
              <span className={styles.emoji}>{mood.emoji}</span>
            </span>
            <span className={styles.label}>{mood.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MoodSelector;
