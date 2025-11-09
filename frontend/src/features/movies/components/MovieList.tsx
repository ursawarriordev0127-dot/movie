'use client';

import React from 'react';
import { Movie } from '@/src/types';
import { MovieCard } from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  loading?: boolean;
}

export const MovieList: React.FC<MovieListProps> = ({ movies, loading }) => {
  // Ensure movies is always an array
  const moviesArray = Array.isArray(movies) ? movies : [];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-[120px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-card-color rounded-[12px] p-2 animate-pulse"
          >
            <div className="h-[400px] bg-input-color rounded-[12px] mb-4" />
            <div className="px-2 pb-2">
              <div className="h-6 bg-input-color rounded mb-2" />
              <div className="h-4 bg-input-color rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (moviesArray.length === 0) {
    return null; // Empty state is handled by parent component
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-[120px]">
      {moviesArray.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

