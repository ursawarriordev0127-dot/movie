import { api } from '@/src/lib/api/client';
import { API_ENDPOINTS } from '@/src/constants';
import { Movie, PaginatedResponse } from '@/src/types';

export type CreateMovieDto = {
  title: string;
  publishing_year: number;
  poster_url?: string | null;
};

export type UpdateMovieDto = Partial<CreateMovieDto>;

export type PaginationQuery = {
  page?: number;
  limit?: number;
};

export const moviesApi = {
  getAll: async (query?: PaginationQuery): Promise<PaginatedResponse<Movie>> => {
    try {
      const response = await api.get<PaginatedResponse<Movie>>(
        API_ENDPOINTS.MOVIES.BASE,
        { params: query },
      );
      
      // Handle different response structures
      if (!response.data) {
        throw new Error('No data in response');
      }
      
      // If response.data is already the paginated structure
      if (response.data.data && response.data.meta) {
        return response.data;
      }
      
      // If response.data is the array directly (unlikely but handle it)
      if (Array.isArray(response.data)) {
        return {
          data: response.data,
          meta: {
            page: query?.page || 1,
            limit: query?.limit || 10,
            total: response.data.length,
            totalPages: 1,
            hasMore: false,
          },
        };
      }
      
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  getById: async (id: string): Promise<{ data: Movie }> => {
    const { data } = await api.get<Movie>(API_ENDPOINTS.MOVIES.BY_ID(id));
    return { data };
  },

  create: async (
    movieData: CreateMovieDto,
    file?: File,
  ): Promise<Movie> => {
    const formData = new FormData();
    formData.append('title', movieData.title);
    formData.append('publishing_year', movieData.publishing_year.toString());
    if (file) {
      formData.append('poster', file);
    }

    const { data } = await api.post<Movie>(
      API_ENDPOINTS.MOVIES.BASE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data;
  },

  update: async (
    id: string,
    movieData: UpdateMovieDto,
    file?: File,
  ): Promise<Movie> => {
    const formData = new FormData();
    if (movieData.title) formData.append('title', movieData.title);
    if (movieData.publishing_year)
      formData.append('publishing_year', movieData.publishing_year.toString());
    if (file) {
      formData.append('poster', file);
    } else if (movieData.poster_url !== undefined) {
      formData.append('poster_url', movieData.poster_url || '');
    }

    const { data } = await api.patch<Movie>(
      API_ENDPOINTS.MOVIES.BY_ID(id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.MOVIES.BY_ID(id));
  },
};
