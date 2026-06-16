/**
 * Static option lists for the Diary Card.
 */

/** Number of blank emotion rows shown to start (more via "Add emotion"). */
export const EMOTION_ROWS = 3;

/** Example emotions shown in the intro to help the user choose their own. */
export const PRIMARY_EMOTIONS = [
  'Anger',
  'Fear',
  'Sadness',
  'Joy',
  'Love',
  'Shame',
  'Disgust',
  'Surprise',
];

/** Example secondary emotions shown in the intro. */
export const SECONDARY_EMOTIONS = [
  'Annoyed',
  'Frustrated',
  'Resentful',
  'Worried',
  'Anxious',
  'Nervous',
  'Vulnerable',
  'Hurt',
  'Lonely',
  'Disappointed',
  'Hopeless',
  'Grateful',
  'Excited',
  'Proud',
  'Content',
  'Caring',
  'Embarrassed',
  'Guilty',
  'Repulsed',
  'Shocked',
];

/** Seven coping skills (each day: used ✓, not used ✗, or unset). */
export const SKILLS = [
  'Mindfulness',
  'Breathing',
  'Grounding',
  'Sleep Hygiene',
  'Behavioral Activation',
  'Managing Thoughts',
  'Mental Health Habits',
];

/** Short day labels, Monday → Sunday. */
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Intensity scale 1–5 (0 = not set). */
export const MAX_INTENSITY = 5;

/** "How I felt after using skills" — tap to cycle through these faces. */
export const FELT_AFTER = [
  { value: 'Much worse', emoji: '😣', label: 'Much worse' },
  { value: 'Worse', emoji: '🙁', label: 'Worse' },
  { value: 'Same', emoji: '😐', label: 'Same' },
  { value: 'Better', emoji: '🙂', label: 'Better' },
  { value: 'Much better', emoji: '😄', label: 'Much better' },
];
