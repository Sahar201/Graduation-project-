import express from 'express';
import {
  getArticles,
  getArticleById,
  getVideos,
  getVideoById,
} from '../controllers/contentController.js';

const router = express.Router();

router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.get('/videos', getVideos);
router.get('/videos/:id', getVideoById);

export default router;
