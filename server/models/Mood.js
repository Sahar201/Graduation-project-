import mongoose from 'mongoose';

export const MOOD_VALUES = ['Very Happy', 'Happy', 'Neutral', 'Sad', 'Anxious'];

const moodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    mood: {
      type: String,
      required: [true, 'Mood is required'],
      enum: { values: MOOD_VALUES, message: 'Invalid mood value' },
    },
    note: { type: String, trim: true, maxlength: 500, default: '' },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Mood || mongoose.model('Mood', moodSchema);
