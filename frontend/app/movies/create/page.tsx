'use client';

import { CreateMoviePage } from '@/src/pages/movies/CreateMoviePage';
import { ProtectedRoute } from '@/components/shared';

export default function CreateMovieRoute() {
  return (
    <ProtectedRoute>
      <CreateMoviePage />
    </ProtectedRoute>
  );
}

