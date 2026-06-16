import api from './api.js';

/** Register a new account. @returns {Promise<{user, token, message}>} */
export const register = async ({ name, email, password }) => {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data;
};

/** Log in. @returns {Promise<{user, token, message}>} */
export const login = async ({ email, password }) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

/** Verify the token and get the current user. */
export const getCurrentUser = async () => {
  const { data } = await api.get('/auth/me');
  return data.user;
};

/** Reset the password for an account by email. */
export const resetPassword = async ({ email, newPassword }) => {
  const { data } = await api.post('/auth/reset-password', { email, newPassword });
  return data;
};
