import express from 'express';
import { getDashboard } from '../controllers/moodController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.get('/', protect, getDashboard);

export default router;
