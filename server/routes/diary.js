import express from 'express';
import { saveWeek, getWeeks, getWeek, deleteWeek } from '../controllers/diaryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.route('/').post(saveWeek).get(getWeeks);
router.route('/:weekId').get(getWeek).delete(deleteWeek);

export default router;
