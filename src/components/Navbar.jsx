import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import styles from '../styles/Navbar.module.css';

/**
 * Top navigation bar.
 * - Logo on the left, page links in the center.
 * - Login/Register buttons on the right for guests.
 * - A greeting + Logout for authenticated users.
 * - Collapses into a hamburger menu on mobile.
 */
const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    toast.success('You have been logged out');
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <i className={`fa-solid fa-heart ${styles.logoIcon}`} />
          <span>
            You<span className={styles.logoAccent}>Matter</span>
          </span>
        </Link>

        <button
          className={styles.toggle}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`} />
        </button>

        <nav className={`${styles.menu} ${open ? styles.menuOpen : ''}`}>
          <ul className={styles.links}>
            <li>
              <NavLink to="/" className={navLinkClass} onClick={closeMenu} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/mood-tracker" className={navLinkClass} onClick={closeMenu}>
                Mood Tracker
              </NavLink>
            </li>
            <li>
              <NavLink to="/diary-card" className={navLinkClass} onClick={closeMenu}>
                Diary Card
              </NavLink>
            </li>
            <li>
              <NavLink to="/articles" className={navLinkClass} onClick={closeMenu}>
                Articles
              </NavLink>
            </li>
            <li>
              <NavLink to="/videos" className={navLinkClass} onClick={closeMenu}>
                Videos &amp; Exercises
              </NavLink>
            </li>
          </ul>

          <div className={styles.actions}>
            {isAuthenticated ? (
              <>
                <span className={styles.greeting}>
                  <i className="fa-solid fa-circle-user" /> {user?.name?.split(' ')[0]}
                </span>
                <button className="btn btn-outline" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary" onClick={closeMenu}>
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
