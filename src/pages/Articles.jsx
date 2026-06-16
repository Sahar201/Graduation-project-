import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ArticleCard from '../components/ArticleCard.jsx';
import { getArticles } from '../services/articleService.js';
import { useToast } from '../context/ToastContext.jsx';
import styles from '../styles/Articles.module.css';

const CATEGORIES = [
  'All',
  'Depression',
  'Anxiety',
  'Panic Attacks',
  'Anxiety Attacks',
  'Loneliness',
  'Social Isolation',
  'Stress',
  'Sleeping Problems',
];

/**
 * Articles page: category filter buttons + responsive grid of article cards.
 * Filtering is done client-side for instant, animated transitions.
 */
const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (error) {
      toast.error(error.message || 'Could not load articles');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const filtered =
    activeFilter === 'All'
      ? articles
      : articles.filter((a) => a.category === activeFilter);

  return (
    <div className="page">
      <div className="container">
        <h1 className="section-title">Mental Health Articles</h1>
        <p className="section-subtitle">
          Explore a curated sanctuary of compassionate, easy-to-read guidance
          designed to support your journey toward inner peace and emotional
          resilience.
        </p>

        {/* Filter buttons */}
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
          <div className="spinner-page" aria-label="Loading articles" />
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <i className="fa-regular fa-folder-open" />
            <p>No articles found in this category yet.</p>
          </div>
        ) : (
          <motion.div layout className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {filtered.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Articles;
