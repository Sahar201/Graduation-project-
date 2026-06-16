import axios from 'axios';

/**
 * Axios instance for the YouMatter API.
 * Dev: Vite proxies /api → the local Express server.
 * Vercel: /api is served by the serverless function in /api/index.js.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach the JWT (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('youmatter_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Clear the session on auth failure (except during login/register attempts).
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';
    const isAuthAttempt = url.includes('/auth/');
    if (status === 401 && !isAuthAttempt) {
      localStorage.removeItem('youmatter_token');
      localStorage.removeItem('youmatter_user');
    }
    const message =
      error.response?.data?.message || error.message || 'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);

export default api;
