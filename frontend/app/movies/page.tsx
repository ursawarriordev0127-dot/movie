'use client';

import MoviesPage from '@/src/pages/movies/MoviesPage';
import { ProtectedRoute } from '@/components/shared';

export default function MoviesRoute() {
  return (
    <ProtectedRoute>
      <MoviesPage />
    </ProtectedRoute>
  );
}

