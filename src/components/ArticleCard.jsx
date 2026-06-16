import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from '../styles/Articles.module.css';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80';

/**
 * Article preview card: image, category tag, title, short summary, read time
 * and a "Read More" link that opens the full article on its own page.
 */
const ArticleCard = ({ article }) => {
  const [imgSrc, setImgSrc] = useState(article.image);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={styles.card}
    >
      <Link to={`/articles/${article.id}`} className={styles.imageWrap}>
        <img
          src={imgSrc}
          alt={article.title}
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
        <span className={styles.tag}>{article.category}</span>
      </Link>

      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link to={`/articles/${article.id}`}>{article.title}</Link>
        </h3>
        <p className={styles.desc}>{article.description}</p>

        <div className={styles.footer}>
          <span className={styles.readTime}>
            <i className="fa-regular fa-clock" /> {article.readTime} min read
          </span>
          <Link to={`/articles/${article.id}`} className={styles.readMore}>
            Read More <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default ArticleCard;
