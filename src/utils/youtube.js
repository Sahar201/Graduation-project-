/**
 * Helpers for working with YouTube links.
 * Supports both `https://youtu.be/ID` and `https://www.youtube.com/watch?v=ID`.
 */

/** Extract the 11-character YouTube video id from a URL. */
export const getYouTubeId = (url = '') => {
  const patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const match = url.match(re);
    if (match) return match[1];
  }
  return '';
};

/** Thumbnail image URL for a video (high quality, always available). */
export const getYouTubeThumbnail = (url) => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
};

/** Privacy-friendly embed URL with sensible playback params. */
export const getYouTubeEmbedUrl = (url) => {
  const id = getYouTubeId(url);
  return id
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
    : '';
};
