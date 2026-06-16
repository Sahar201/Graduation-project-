import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getArticleById, getArticles } from '../services/articleService.js';
import { useToast } from '../context/ToastContext.jsx';
import styles from '../styles/ArticleDetail.module.css';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80';

/**
 * Renders article body text. Blocks are separated by blank lines. Within a
 * block, a first line wrapped in **double asterisks** becomes a section
 * heading and the remaining lines become its paragraph.
 */
const ArticleBody = ({ content }) =>
  content.split('\n\n').map((block, i) => {
    const lines = block.split('\n');
    const headingMatch = lines[0].match(/^\*\*(.+)\*\*$/);

    if (headingMatch) {
      const body = lines.slice(1).join(' ').trim();
      return (
        <div key={i}>
          <h2>{headingMatch[1]}</h2>
          {body && <p>{body}</p>}
        </div>
      );
    }
    return <p key={i}>{block}</p>;
  });

/**
 * Dedicated page for a single article: hero, formatted body, a Back to Articles
 * button, and a Related Articles section.
 */
const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const [current, all] = await Promise.all([
          getArticleById(id),
          getArticles(),
        ]);
        if (!active) return;
        setArticle(current);
        setImgSrc(current.image);
        setRelated(all.filter((a) => a.id !== current.id).slice(0, 3));
      } catch (error) {
        if (active) toast.error(error.message || 'Could not load this article');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [id, toast]);

  if (loading) {
    return (
      <div className="page">
        <div className="spinner-page" aria-label="Loading article" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="page">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="section-title">Article not found</h1>
          <p className="section-subtitle">
            This article may have moved. Let's head back to the library.
          </p>
          <Link to="/articles" className="btn btn-primary">
            <i className="fa-solid fa-arrow-left" /> Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <article className={styles.wrap}>
        <div className="container">
          <button className={styles.back} onClick={() => navigate('/articles')}>
            <i className="fa-solid fa-arrow-left" /> Back to Articles
          </button>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className={styles.category}>{article.category}</span>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.meta}>
              <span>
                <i className="fa-regular fa-clock" /> {article.readTime} min read
              </span>
            </div>

            <div className={styles.hero}>
              <img
                src={imgSrc}
                alt={article.title}
                onError={() => setImgSrc(FALLBACK_IMAGE)}
              />
            </div>

            <div className={styles.lead}>{article.description}</div>

            <div className={styles.content}>
              <ArticleBody content={article.content} />
            </div>
          </motion.div>

          <div className={styles.disclaimer}>
            <i className="fa-solid fa-heart" />
            <p>
              If your symptoms become severe, long-lasting, or interfere with daily
              life, please reach out to a mental health professional. You don't have
              to face it alone — support is always available.
            </p>
          </div>
        </div>

        {/* ---------------------- Related articles ---------------------- */}
        {related.length > 0 && (
          <section className={styles.relatedSection}>
            <div className="container">
              <h2 className={styles.relatedTitle}>Related Articles</h2>
              <div className={styles.relatedGrid}>
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/articles/${rel.id}`}
                    className={styles.relatedCard}
                  >
                    <span className={styles.relatedTag}>{rel.category}</span>
                    <h3>{rel.title}</h3>
                    <p>{rel.description}</p>
                    <span className={styles.relatedLink}>
                      Read More <i className="fa-solid fa-arrow-right" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </div>
  );
};

export default ArticleDetail;
