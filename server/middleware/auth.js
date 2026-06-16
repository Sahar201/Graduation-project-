import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/** Verify the JWT and attach the user to req.user. */
export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: 'Not authorized, token invalid or expired' });
  }
};
