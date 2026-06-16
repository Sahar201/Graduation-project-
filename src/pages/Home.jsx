import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuoteRotator from '../components/QuoteRotator.jsx';
import styles from '../styles/Home.module.css';

// Local image (drop "home page.jpg" into public/images). Falls back to a stock photo.
const HERO_IMAGE = '/images/home page.jpg';
const HERO_FALLBACK =
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1000&q=80';

const tools = [
  {
    icon: 'fa-chart-line',
    title: 'Mood Tracker',
    text: 'Check in with yourself daily and watch your emotional trends unfold over time.',
    to: '/mood-tracker',
    cta: 'Track your mood',
  },
  {
    icon: 'fa-book-open',
    title: 'Curated Articles',
    text: 'Read trusted, easy-to-digest articles on anxiety, depression, sleep, stress and more.',
    to: '/articles',
    cta: 'Browse articles',
  },
  {
    icon: 'fa-spa',
    title: 'Guided Exercises',
    text: 'Calm your mind with breathing exercises and mindful videos in our Mindful Library.',
    to: '/videos',
    cta: 'Start an exercise',
  },
];

/**
 * Home page: hero, tools section, and the looping quote rotator.
 */
const Home = () => {
  return (
    <div className={styles.home}>
      {/* ---------------------------- Hero ---------------------------- */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.badge}>
              <i className="fa-solid fa-heart" /> A Safe Space for You
            </span>
            <h1 className={styles.heroTitle}>
              You don’t have to <span className={styles.highlight}>face it alone</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Find solace in a digital sanctuary designed for your mental
              well-being. Connect with tools, articles, and guided exercises
              built on psychological safety and warmth.
            </p>
            <div className={styles.heroActions}>
              <Link to="/register" className="btn btn-primary">
                Get Started <i className="fa-solid fa-arrow-right" />
              </Link>
              <a href="#tools" className="btn btn-outline">
                Learn More
              </a>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={HERO_IMAGE}
              alt="A calm, peaceful moment"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = HERO_FALLBACK;
              }}
            />
            <div className={styles.heroFloat}>
              <i className="fa-solid fa-leaf" />
              <div>
                <strong>Breathe</strong>
                <span>You’re doing great</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --------------------------- Tools ---------------------------- */}
      <section id="tools" className={styles.tools}>
        <div className="container">
          <h2 className="section-title">Tools to support you</h2>
          <p className="section-subtitle">
            Everything you need to care for your mind, in one calm place.
          </p>

          <div className={styles.toolGrid}>
            {tools.map((tool, i) => (
              <motion.div
                key={tool.title}
                className={styles.toolCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className={styles.toolIcon}>
                  <i className={`fa-solid ${tool.icon}`} />
                </div>
                <h3>{tool.title}</h3>
                <p>{tool.text}</p>
                <Link to={tool.to} className={styles.toolLink}>
                  {tool.cta} <i className="fa-solid fa-arrow-right" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- Quotes --------------------------- */}
      <QuoteRotator />
    </div>
  );
};

export default Home;
