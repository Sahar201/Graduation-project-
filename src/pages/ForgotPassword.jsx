import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resetPassword } from '../services/authService.js';
import { useToast } from '../context/ToastContext.jsx';
import styles from '../styles/Auth.module.css';

/**
 * Forgot / reset password page.
 * Device-local reset: the user confirms their email and sets a new password.
 */
const ForgotPassword = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined, form: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email';
    if (!form.password) next.password = 'New password is required';
    else if (form.password.length < 6)
      next.password = 'Password must be at least 6 characters';
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await resetPassword({ email: form.email, newPassword: form.password });
      toast.success('Password updated — please log in');
      navigate('/login', { replace: true });
    } catch (error) {
      toast.error(error.message || 'Could not reset password');
      setErrors({ form: error.message });
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
            <i className="fa-solid fa-key" />
          </div>
          <h1>Reset your password</h1>
          <p>Enter your email and choose a new password to continue.</p>
        </div>

        {errors.form && (
          <div className={styles.formError}>
            <i className="fa-solid fa-circle-exclamation" /> {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
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
            <label htmlFor="password">New password</label>
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
            {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="confirm">Confirm new password</label>
            <div className={styles.inputWrap}>
              <i className="fa-solid fa-lock" />
              <input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="Re-enter your new password"
                value={form.confirm}
                onChange={handleChange}
                className={errors.confirm ? styles.inputError : ''}
                autoComplete="new-password"
              />
            </div>
            {errors.confirm && <span className={styles.fieldError}>{errors.confirm}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? <span className="spinner" /> : 'Update Password'}
          </button>
        </form>

        <p className={styles.switch}>
          Remembered it? <Link to="/login">Back to Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
