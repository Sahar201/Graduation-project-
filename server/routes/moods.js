import express from 'express';
import { body } from 'express-validator';
import { createMood, getMoods, deleteMood } from '../controllers/moodController.js';
import { protect } from '../middleware/auth.js';
import { MOOD_VALUES } from '../models/Mood.js';

const router = express.Router();
router.use(protect);

router
  .route('/')
  .post(
    [
      body('mood').isIn(MOOD_VALUES).withMessage('Invalid mood value'),
      body('note').optional().isLength({ max: 500 }).withMessage('Note too long'),
    ],
    createMood
  )
  .get(getMoods);

router.delete('/:id', deleteMood);

export default router;

