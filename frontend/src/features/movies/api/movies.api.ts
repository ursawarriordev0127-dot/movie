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
      const response = await api.get(API_ENDPOINTS.MOVIES.BASE, {
        params: query,
      });
      
      // Backend uses TransformInterceptor which wraps response in { data: ..., statusCode: ... }
      // So response.data is { data: PaginatedResponse<Movie>, statusCode: number }
      const actualData = response.data?.data || response.data;
      
      if (!actualData) {
        throw new Error('No data in response');
      }
      
      // Ensure we have the expected structure
      if (actualData.data && actualData.meta) {
        return actualData as PaginatedResponse<Movie>;
      }
      
      // Fallback: if response is an array, wrap it
      if (Array.isArray(actualData)) {
        return {
          data: actualData,
          meta: {
            page: query?.page || 1,
            limit: query?.limit || 10,
            total: actualData.length,
            totalPages: 1,
            hasMore: false,
          },
        };
      }
      
      return actualData as PaginatedResponse<Movie>;
    } catch (error: any) {
      throw error;
    }
  },

  getById: async (id: string): Promise<{ data: Movie }> => {
    const response = await api.get(API_ENDPOINTS.MOVIES.BY_ID(id));
    
    // Backend uses TransformInterceptor which wraps response in { data: ..., statusCode: ... }
    // So response.data is { data: Movie, statusCode: number }
    const actualData = response.data?.data || response.data;
    
    if (!actualData) {
      throw new Error('No data in response');
    }
    
    // Return as { data: Movie } to match EditMovie component expectation
    return { data: actualData as Movie };
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

    const response = await api.post(
      API_ENDPOINTS.MOVIES.BASE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    
    // Backend uses TransformInterceptor which wraps response in { data: ..., statusCode: ... }
    const actualData = response.data?.data || response.data;
    
    if (!actualData) {
      throw new Error('No data in response');
    }
    
    return actualData as Movie;
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

    const response = await api.patch(
      API_ENDPOINTS.MOVIES.BY_ID(id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    
    // Backend uses TransformInterceptor which wraps response in { data: ..., statusCode: ... }
    const actualData = response.data?.data || response.data;
    
    if (!actualData) {
      throw new Error('No data in response');
    }
    
    return actualData as Movie;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.MOVIES.BY_ID(id));
  },
};
