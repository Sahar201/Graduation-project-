import DiaryCard from '../models/DiaryCard.js';

/** POST /api/diary — create or update the week (upsert by weekStartDate). */
export const saveWeek = async (req, res, next) => {
  try {
    const { weekStartDate, weekEndDate, primaryEmotions, secondaryEmotions, skills, feltAfter } =
      req.body;
    if (!weekStartDate || !weekEndDate) {
      return res.status(400).json({ message: 'weekStartDate and weekEndDate are required' });
    }
    const update = { primaryEmotions, secondaryEmotions, skills, feltAfter, weekEndDate };
    const week = await DiaryCard.findOneAndUpdate(
      { userId: req.user._id, weekStartDate },
      { $set: update, $setOnInsert: { userId: req.user._id, weekStartDate } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.status(200).json(week);
  } catch (error) {
    return next(error);
  }
};

/** GET /api/diary — all saved weeks, newest first. */
export const getWeeks = async (req, res, next) => {
  try {
    const weeks = await DiaryCard.find({ userId: req.user._id }).sort({ weekStartDate: -1 });
    return res.json(weeks);
  } catch (error) {
    return next(error);
  }
};

/** GET /api/diary/:weekId — one week by its start date. */
export const getWeek = async (req, res, next) => {
  try {
    const week = await DiaryCard.findOne({ userId: req.user._id, weekStartDate: req.params.weekId });
    if (!week) return res.status(404).json({ message: 'Week not found' });
    return res.json(week);
  } catch (error) {
    return next(error);
  }
};

/** DELETE /api/diary/:weekId */
export const deleteWeek = async (req, res, next) => {
  try {
    const result = await DiaryCard.findOneAndDelete({
      userId: req.user._id,
      weekStartDate: req.params.weekId,
    });
    if (!result) return res.status(404).json({ message: 'Week not found' });
    return res.json({ message: 'Week deleted', weekStartDate: req.params.weekId });
  } catch (error) {
    return next(error);
  }
};
