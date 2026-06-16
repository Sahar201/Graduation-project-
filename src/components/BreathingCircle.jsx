import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Breathing.module.css';

/**
 * Guided breathing exercise.
 * Cycle (15s total): INHALE 5s (grow) → HOLD 5s → EXHALE 5s (shrink), looping.
 * The phase text and circle scale are driven by a JS phase timer so the
 * label always stays in sync with the CSS scale animation.
 */
const PHASES = [
  { name: 'INHALE', duration: 5000, scale: 1.5 },
  { name: 'HOLD', duration: 5000, scale: 1.5 },
  { name: 'EXHALE', duration: 5000, scale: 1 },
];

const BreathingCircle = ({ onComplete }) => {
  const [running, setRunning] = useState(true);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycles, setCycles] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!running) return undefined;

    const current = PHASES[phaseIndex];
    timeoutRef.current = window.setTimeout(() => {
      setPhaseIndex((prev) => {
        const next = (prev + 1) % PHASES.length;
        // A full cycle completes when we wrap back to INHALE.
        if (next === 0) setCycles((c) => c + 1);
        return next;
      });
    }, current.duration);

    return () => window.clearTimeout(timeoutRef.current);
  }, [running, phaseIndex]);

  const phase = PHASES[phaseIndex];

  const toggleRunning = () => setRunning((r) => !r);

  const handleComplete = () => {
    setRunning(false);
    if (onComplete) onComplete(cycles);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.stage}>
        <div className={styles.ripple} />
        <div
          className={`${styles.circle} ${running ? styles.active : ''}`}
          style={{
            transform: `scale(${phase.scale})`,
            // Match the transition to the phase length for a smooth grow/shrink.
            transitionDuration: running ? `${phase.duration}ms` : '0.4s',
          }}
        >
          <span className={styles.phaseText}>{running ? phase.name : 'PAUSED'}</span>
        </div>
      </div>

      <p className={styles.instruction}>
        {running
          ? 'Follow the circle — breathe in as it grows, hold, then breathe out as it shrinks.'
          : 'Take your time. Press resume whenever you are ready.'}
      </p>

      <div className={styles.controls}>
        <button className="btn btn-outline" onClick={toggleRunning}>
          <i className={`fa-solid ${running ? 'fa-pause' : 'fa-play'}`} />
          {running ? 'Pause' : 'Resume'}
        </button>
        <button className="btn btn-primary" onClick={handleComplete}>
          <i className="fa-solid fa-circle-check" />
          Complete Session
        </button>
      </div>

      <p className={styles.cycleCount}>
        Cycles completed: <strong>{cycles}</strong>
      </p>
    </div>
  );
};

export default BreathingCircle;
