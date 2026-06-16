import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email });

const firstError = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array()[0].msg });
    return true;
  }
  return false;
};

/** POST /api/auth/register */
export const registerUser = async (req, res, next) => {
  try {
    if (firstError(req, res)) return;
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'An account with that email already exists' });
    }
    const user = await User.create({ name, email, password });
    return res.status(201).json({
      message: 'Account created successfully',
      user: publicUser(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    return next(error);
  }
};

/** POST /api/auth/login */
export const loginUser = async (req, res, next) => {
  try {
    if (firstError(req, res)) return;
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(200).json({
      message: 'Logged in successfully',
      user: publicUser(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    return next(error);
  }
};

/** GET /api/auth/me */
export const getMe = async (req, res) => res.status(200).json({ user: publicUser(req.user) });

/** POST /api/auth/reset-password */
export const resetPassword = async (req, res, next) => {
  try {
    if (firstError(req, res)) return;
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'No account found with that email' });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return next(error);
  }
};
