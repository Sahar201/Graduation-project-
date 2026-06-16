import { useState, useEffect } from 'react';
import quotes from '../data/quotes.js';
import styles from '../styles/QuoteRotator.module.css';

const ROTATE_MS = 10000; // each quote shows for 10 seconds

/**
 * Inspirational quotes on a dark teal background.
 * A self-running loop: the index advances every 20 seconds and the quote
 * re-mounts (via `key`), replaying a fade-in animation each time.
 */
const QuoteRotator = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  const quote = quotes[index];

  return (
    <section className={styles.section} aria-label="Inspirational quotes">
      <div className={`container ${styles.inner}`}>
        <span className={styles.marks} aria-hidden="true">
          &ldquo;
        </span>
        {/* key={index} re-mounts the block so the fade-in animation replays. */}
        <div className={styles.content} key={index}>
          <p className={styles.text}>{quote.text}</p>
          <p className={styles.author}>— {quote.author}</p>
        </div>
      </div>
    </section>
  );
};

export default QuoteRotator;
