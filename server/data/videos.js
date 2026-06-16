/**
 * Mindful Library videos — real guided exercises (served by the Express API).
 *
 * 👉 Thumbnails: drop files into `public/images/` matching the `thumbnail`
 *    path below. Missing files fall back to a stock photo automatically.
 * 👉 Links: each `url` opens the guided video on YouTube.
 */
const videos = [
  {
    id: 'guided-mindfulness-meditation',
    title: 'A Guided Mindfulness Meditation',
    category: 'Mindfulness',
    duration: 10,
    tip: 'Find a quiet spot and let thoughts pass without judgment.',
    description:
      'Sit comfortably, focus on your breathing, and gently bring your attention back whenever your mind wanders. Good for depression, anxiety, stress, loneliness, and sleep.',
    thumbnail: '/images/video-mindfulness.jpg',
    url: 'https://youtu.be/NECs97k_8Z4',
  },
  {
    id: 'everyday-mindfulness',
    title: 'Everyday Mindfulness Practice',
    category: 'Mindfulness',
    duration: 8,
    tip: 'Bring gentle awareness to one ordinary moment today.',
    description:
      'A simple way to weave mindful attention into daily life — noticing thoughts and sensations without judging them.',
    thumbnail: '/images/video-mindfulness-2.jpg',
    url: 'https://youtu.be/JUSaQL1_zXE',
  },
  {
    id: 'guided-breathing',
    title: 'Guided Breathing Exercise',
    category: 'Breathing',
    duration: 6,
    tip: 'Keep your back straight and breathe slowly through the nose.',
    description:
      'Breathe in for 4 seconds, hold for 4, and breathe out for 4. Repeat 5–10 times. Good for anxiety, panic attacks, stress, and sleep.',
    thumbnail: '/images/video-breathing.jpg',
    url: 'https://youtu.be/tEmt1Znux58',
  },
  {
    id: 'grounding-two-skills',
    title: 'Grounding Techniques: Two Skills',
    category: 'Grounding',
    duration: 7,
    tip: 'Focus on the textures and sounds around you first.',
    description:
      'Practical grounding skills, including the 5-4-3-2-1 technique, to bring your attention back to the present. Good for anxiety, panic attacks, and stress.',
    thumbnail: '/images/video-grounding.jpg',
    url: 'https://youtu.be/H_l6AV6KfO4',
  },
  {
    id: 'better-sleep-habits',
    title: 'Building Better Sleep Habits',
    category: 'Sleep Hygiene',
    duration: 9,
    tip: 'Aim for the same sleep and wake time every day.',
    description:
      'Healthy sleep-hygiene habits to help you fall asleep more easily and rest more deeply. Good for sleeping problems, anxiety, and stress.',
    thumbnail: '/images/video-sleep.jpg',
    url: 'https://youtu.be/TQ8uc85cEu4',
  },
  {
    id: 'calming-wind-down',
    title: 'A Calming Wind-Down for Sleep',
    category: 'Sleep Hygiene',
    duration: 12,
    tip: 'Avoid bright screens for 30 minutes before bed.',
    description:
      'A gentle bedtime wind-down to relax the body and quiet the mind before sleep.',
    thumbnail: '/images/video-sleep-2.jpg',
    url: 'https://youtu.be/a5yoOudqx1Y',
  },
  {
    id: 'behavioral-activation',
    title: 'Behavioral Activation: Getting Started',
    category: 'Behavioral Activation',
    duration: 8,
    tip: 'Action often comes before motivation — start small.',
    description:
      'Choose one small activity, schedule it, and complete it even if you do not feel motivated. Good for depression, loneliness, social isolation, and stress.',
    thumbnail: '/images/video-activation.jpg',
    url: 'https://youtu.be/KFmn2G1asbg',
  },
  {
    id: 'managing-thoughts',
    title: 'Untangling Difficult Thoughts',
    category: 'Managing Thoughts',
    duration: 7,
    tip: 'You are not your thoughts; you are the observer.',
    description:
      'Notice a negative thought, ask whether it is completely true, weigh the evidence, and replace it with a more balanced thought. Good for anxiety, depression, and stress.',
    thumbnail: '/images/video-thoughts.jpg',
    url: 'https://youtu.be/5sS89MbOjjw',
  },
  {
    id: 'eight-habits',
    title: '8 Habits to Improve Your Mental Health',
    category: 'Mental Health Habits',
    duration: 11,
    tip: 'Start with just one habit and build from there.',
    description:
      'Exercise, balanced meals, good sleep, connection, gratitude, and time outdoors — simple habits that support lasting mental well-being.',
    thumbnail: '/images/video-habits.jpg',
    url: 'https://youtu.be/3QIfkeA6HBY',
  },
];

export default videos;
