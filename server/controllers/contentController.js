import articles from '../data/articles.js';
import videos from '../data/videos.js';

const filterByCategory = (items, category) => {
  if (!category) return items;
  const c = category.toLowerCase();
  if (c === 'all' || c === 'all topics') return items;
  return items.filter((i) => i.category.toLowerCase() === c);
};

export const getArticles = (req, res) =>
  res.json(filterByCategory(articles, req.query.category));

export const getArticleById = (req, res) => {
  const article = articles.find((a) => a.id === req.params.id);
  if (!article) return res.status(404).json({ message: 'Article not found' });
  return res.json(article);
};

export const getVideos = (req, res) =>
  res.json(filterByCategory(videos, req.query.category));

export const getVideoById = (req, res) => {
  const video = videos.find((v) => v.id === req.params.id);
  if (!video) return res.status(404).json({ message: 'Video not found' });
  return res.json(video);
};
