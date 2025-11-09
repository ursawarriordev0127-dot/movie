import { API_BASE_URL } from '@/src/constants';

export const getImageUrl = (posterUrl: string | null): string | null => {
  if (!posterUrl) return null;
  if (posterUrl.startsWith('http')) return posterUrl;
  return `${API_BASE_URL}${posterUrl}`;
};

