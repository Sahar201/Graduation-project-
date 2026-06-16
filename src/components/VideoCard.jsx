import { useState } from 'react';
import { motion } from 'framer-motion';
import { getYouTubeThumbnail } from '../utils/youtube.js';
import styles from '../styles/Videos.module.css';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80';

/**
 * A single video card: real YouTube thumbnail, category + duration, title and a
 * helpful tip. Clicking (or pressing Enter) plays the video in a modal via the
 * `onPlay` callback — the user never leaves the site.
 */
const VideoCard = ({ video, onPlay }) => {
  // Prefer a custom thumbnail if the user added one, else the YouTube thumbnail.
  const initial =
    video.thumbnail && !video.thumbnail.startsWith('/images/video-')
      ? video.thumbnail
      : getYouTubeThumbnail(video.url) || video.thumbnail;

  const [imgSrc, setImgSrc] = useState(initial);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={styles.card}
      onClick={() => onPlay(video)}
      role="button"
      tabIndex={0}
      aria-label={`Play ${video.title}`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onPlay(video)}
    >
      <div className={styles.thumbWrap}>
        <img
          src={imgSrc}
          alt={video.title}
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
        <span className={styles.play}>
          <i className="fa-solid fa-play" />
        </span>
        <span className={styles.duration}>
          <i className="fa-regular fa-clock" /> {video.duration} min
        </span>
      </div>

      <div className={styles.body}>
        <span className={styles.tag}>{video.category}</span>
        <h3 className={styles.title}>{video.title}</h3>
        <p className={styles.desc}>{video.description}</p>
        <div className={styles.tip}>
          <i className="fa-solid fa-lightbulb" />
          <span>{video.tip}</span>
        </div>
      </div>
    </motion.article>
  );
};

export default VideoCard;
