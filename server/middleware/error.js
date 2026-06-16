import connectDB from '../config/db.js';

/** Ensure a DB connection before DB-backed routes (serverless-friendly). */
export const withDb = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
};

/** 404 for unknown /api routes. */
export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

/** Normalize errors into clean JSON. */
export const errorHandler = (err, req, res, next) => {
  let status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Server error';

  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  }
  if (err.code === 11000) {
    status = 400;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `An account with that ${field} already exists`;
  }
  if (err.name === 'CastError') {
    status = 400;
    message = `Invalid ${err.path}`;
  }

  res.status(status).json({ message });
};
