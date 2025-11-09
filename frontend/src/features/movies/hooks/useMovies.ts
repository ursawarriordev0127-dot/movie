'use client';

import { useState, useEffect, useCallback } from 'react';
import { moviesApi, PaginationQuery } from '../api/movies.api';
import { Movie, PaginatedResponse } from '@/src/types';
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/src/constants';

export const useMovies = (initialQuery?: PaginationQuery) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: initialQuery?.page || DEFAULT_PAGE,
    limit: initialQuery?.limit || DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
    hasMore: false,
  });

  const fetchMovies = useCallback(async (query?: PaginationQuery) => {
    try {
      setLoading(true);
      setError(null);
      const response: PaginatedResponse<Movie> = await moviesApi.getAll(query);
      
      // Ensure response has the expected structure
      if (!response) {
        setMovies([]);
        setPagination({
          page: query?.page || DEFAULT_PAGE,
          limit: query?.limit || DEFAULT_LIMIT,
          total: 0,
          totalPages: 0,
          hasMore: false,
        });
        return;
      }
      
      // Handle response structure - response.data.data is the array of movies
      const moviesData = Array.isArray(response.data?.data) ? response.data.data : (Array.isArray(response.data) ? response.data : []);
      
      const paginationMeta = response.data?.meta || response.meta || {
        page: query?.page || DEFAULT_PAGE,
        limit: query?.limit || DEFAULT_LIMIT,
        total: 0,
        totalPages: 0,
        hasMore: false,
      };
      
      // Ensure totalPages is at least 1 if there are any movies
      if (paginationMeta.totalPages === 0 && moviesData.length > 0) {
        paginationMeta.totalPages = 1;
      }
      
      setMovies(moviesData);
      setPagination(paginationMeta);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch movies';
      setError(errorMessage);
      // Ensure movies is always an array, even on error
      setMovies([]);
      setPagination({
        page: query?.page || DEFAULT_PAGE,
        limit: query?.limit || DEFAULT_LIMIT,
        total: 0,
        totalPages: 0,
        hasMore: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(initialQuery);
  }, [fetchMovies, initialQuery?.page, initialQuery?.limit]);

  const refetch = useCallback((query?: PaginationQuery) => {
    fetchMovies(query || { page: pagination.page, limit: pagination.limit });
  }, [fetchMovies, pagination.page, pagination.limit]);

  return {
    movies,
    loading,
    error,
    pagination,
    refetch,
  };
};
