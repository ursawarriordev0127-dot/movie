export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const API_PREFIX = '/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: `${API_PREFIX}/auth/signin`,
    SIGNUP: `${API_PREFIX}/auth/signup`,
    ME: `${API_PREFIX}/auth/me`,
  },
  MOVIES: {
    BASE: `${API_PREFIX}/movies`,
    BY_ID: (id: string) => `${API_PREFIX}/movies/${id}`,
  },
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
} as const;

export const ROUTES = {
  HOME: '/',
  MOVIES: '/movies',
  CREATE_MOVIE: '/movies/create',
  EDIT_MOVIE: (id: string) => `/movies/edit/${id}`,
} as const;

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 8;

