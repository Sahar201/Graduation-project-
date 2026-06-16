import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import VideoCard from '../components/VideoCard.jsx';
import VideoModal from '../components/VideoModal.jsx';
import BreathingCircle from '../components/BreathingCircle.jsx';
import { getVideos } from '../services/videoService.js';
import { useToast } from '../context/ToastContext.jsx';
import styles from '../styles/Videos.module.css';

const CATEGORIES = [
  'All Topics',
  'Mindfulness',
  'Breathing',
  'Grounding',
  'Sleep Hygiene',
  'Behavioral Activation',
  'Managing Thoughts',
  'Mental Health Habits',
];

/**
 * Videos page (Mindful Library): a guided breathing exercise at the top,
 * followed by a filterable grid of mindful videos.
 */
const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All Topics');
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const toast = useToast();

  const loadVideos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getVideos();
      setVideos(data);
    } catch (error) {
      toast.error(error.message || 'Could not load videos');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const handleBreathingComplete = (cycles) => {
    toast.success(
      cycles > 0
        ? `Beautiful work — you completed ${cycles} breathing cycle${cycles > 1 ? 's' : ''}.`
        : 'Session complete. Be proud of taking this moment for yourself.'
    );
  };

  const filtered =
    activeFilter === 'All Topics'
      ? videos
      : videos.filter((v) => v.category === activeFilter);

  return (
    <div className="page">
      <div className="container">
        {/* ---------------------- Breathing exercise ---------------------- */}
        <section className={styles.breathing}>
          <h1 className={styles.breathingTitle}>Simple Breath</h1>
          <p className={styles.breathingSub}>
            Follow the circle. Inhale as it grows, exhale as it softens.
          </p>
          <BreathingCircle onComplete={handleBreathingComplete} />
        </section>

        {/* ---------------------- Library ---------------------- */}
        <h2 className="section-title">Mindful Library</h2>
        <p className="section-subtitle">
          Guided videos for movement, breathing, grounding, and rest — curated
          for your well-being.
        </p>

        <div className={styles.filters}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${
                activeFilter === cat ? styles.filterActive : ''
              }`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="spinner-page" aria-label="Loading videos" />
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <i className="fa-regular fa-folder-open" />
            <p>No videos found in this topic yet.</p>
          </div>
        ) : (
          <motion.div layout className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {filtered.map((video) => (
                <VideoCard key={video.id} video={video} onPlay={setActiveVideo} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
};

export default Videos;
