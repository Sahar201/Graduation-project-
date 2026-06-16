import api from './api.js';
import localVideos from '../data/videos.js';

/**
 * Videos come from the Express API, with a bundled-data fallback so the
 * Mindful Library always renders even if the backend isn't reachable.
 */
export const getVideos = async (category) => {
  try {
    const params =
      category && category !== 'All Topics' && category !== 'All' ? { category } : {};
    const { data } = await api.get('/videos', { params });
    return data;
  } catch {
    if (!category || category === 'All Topics' || category === 'All') return localVideos;
    return localVideos.filter((v) => v.category === category);
  }
};

export const getVideoById = async (id) => {
  try {
    const { data } = await api.get(`/videos/${id}`);
    return data;
  } catch {
    const video = localVideos.find((v) => v.id === id);
    if (!video) throw new Error('Video not found');
    return video;
  }
};
