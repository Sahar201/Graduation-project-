import mongoose from 'mongoose';

/**
 * Serverless-friendly MongoDB connection.
 * On Vercel each request can run in a fresh function instance, so we cache the
 * connection on the global object and reuse it across invocations.
 */
let cached = global._youmatterMongoose;
if (!cached) {
  cached = global._youmatterMongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not set. Add it to your .env or Vercel env vars.');
  }

  if (!cached.promise) {
    mongoose.set('strictQuery', true);
    cached.promise = mongoose.connect(uri, { bufferCommands: false }).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
