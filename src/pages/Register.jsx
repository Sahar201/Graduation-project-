import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import styles from '../styles/Auth.module.css';

/**
 * Register page: validates input, creates an account, then redirects to the
 * login page (per spec) so the user can sign in.
 */
const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required';
    else if (form.name.trim().length < 2)
      next.name = 'Name must be at least 2 characters';

    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = 'Please enter a valid email';

    if (!form.password) next.password = 'Password is required';
    else if (form.password.length < 6)
      next.password = 'Password must be at least 6 characters';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await register(form);
      toast.success('Account created! Please log in.');
      navigate('/login', { replace: true });
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      setErrors({ form: error.message || 'Could not create account' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`page ${styles.authPage}`}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.header}>
          <div className={styles.iconBubble}>
            <i className="fa-solid fa-seedling" />
          </div>
          <h1>Create your account</h1>
          <p>Start your journey toward a healthier mind.</p>
        </div>

        {errors.form && (
          <div className={styles.formError}>
            <i className="fa-solid fa-circle-exclamation" /> {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="name">Full name</label>
            <div className={styles.inputWrap}>
              <i className="fa-regular fa-user" />
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? styles.inputError : ''}
                autoComplete="name"
              />
            </div>
            {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrap}>
              <i className="fa-regular fa-envelope" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? styles.inputError : ''}
                autoComplete="email"
              />
            </div>
            {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrap}>
              <i className="fa-solid fa-lock" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? styles.inputError : ''}
                autoComplete="new-password"
              />
            </div>
            {errors.password && (
              <span className={styles.fieldError}>{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={submitting}
          >
            {submitting ? <span className="spinner" /> : 'Create Account'}
          </button>
        </form>

        <p className={styles.switch}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
