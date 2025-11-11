'use client';

import MoviesPage from '@/src/pages/movies/MoviesPage';
import { ProtectedRoute } from '@/components/shared';

// Force dynamic rendering to prevent prerendering issues with AuthProvider
export const dynamic = 'force-dynamic';

export default function MoviesRoute() {
  return (
    <ProtectedRoute>
      <MoviesPage />
    </ProtectedRoute>
  );
}

