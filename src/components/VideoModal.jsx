import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getYouTubeEmbedUrl } from '../utils/youtube.js';
import styles from '../styles/VideoModal.module.css';

/**
 * Full-screen-capable modal that plays a video with an embedded YouTube player.
 * The user never leaves the site. Closes on backdrop click, the × button, or
 * the Escape key; locks page scroll while open.
 */
const VideoModal = ({ video, onClose }) => {
  useEffect(() => {
    if (!video) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className={styles.backdrop}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
        >
          <motion.div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25 }}
          >
            <button className={styles.close} onClick={onClose} aria-label="Close video">
              <i className="fa-solid fa-xmark" />
            </button>

            <div className={styles.player}>
              <iframe
                src={getYouTubeEmbedUrl(video.url)}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className={styles.info}>
              <span className={styles.tag}>
                {video.category} · {video.duration} min
              </span>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <div className={styles.tip}>
                <i className="fa-solid fa-lightbulb" />
                <span>{video.tip}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
