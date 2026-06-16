import mongoose from 'mongoose';

/**
 * One week of a user's diary card.
 * Emotions are user-named rows ({ name, ratings: number[7] }); skills are
 * Y/N/'' per day; feltAfter is one of the face values per day.
 */
const emotionRowSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    ratings: { type: [Number], default: () => [0, 0, 0, 0, 0, 0, 0] },
  },
  { _id: false }
);

const diarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    weekStartDate: { type: String, required: true }, // YYYY-MM-DD (Monday)
    weekEndDate: { type: String, required: true },
    primaryEmotions: { type: [emotionRowSchema], default: [] },
    secondaryEmotions: { type: [emotionRowSchema], default: [] },
    // Stored as plain objects: { [skillName]: ('Y'|'N'|'')[7] }
    skills: { type: mongoose.Schema.Types.Mixed, default: {} },
    feltAfter: { type: [String], default: () => ['', '', '', '', '', '', ''] },
  },
  { timestamps: true }
);

// One diary document per user per week.
diarySchema.index({ userId: 1, weekStartDate: 1 }, { unique: true });

export default mongoose.models.DiaryCard || mongoose.model('DiaryCard', diarySchema);
