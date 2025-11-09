export type User = {
  id: string;
  email: string;
};

export type Movie = {
  id: string;
  title: string;
  publishing_year: number;
  poster_url: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type AuthResponse = {
  access_token: string;
  user: User;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type ApiError = {
  statusCode: number;
  message: string | string[];
  timestamp: string;
  path: string;
};

