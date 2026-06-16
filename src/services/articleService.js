import api from './api.js';
import localArticles from '../data/articles.js';

/**
 * Articles come from the Express API. If the API is unreachable (e.g. a static
 * deploy without the backend), we fall back to the bundled data so the page
 * never breaks.
 */
export const getArticles = async (category) => {
  try {
    const params = category && category !== 'All' ? { category } : {};
    const { data } = await api.get('/articles', { params });
    return data;
  } catch {
    if (!category || category === 'All') return localArticles;
    return localArticles.filter((a) => a.category === category);
  }
};

export const getArticleById = async (id) => {
  try {
    const { data } = await api.get(`/articles/${id}`);
    return data;
  } catch {
    const article = localArticles.find((a) => a.id === id);
    if (!article) throw new Error('Article not found');
    return article;
  }
};
