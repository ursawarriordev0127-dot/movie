'use client';

import { EditMoviePage } from '@/src/pages/movies/EditMoviePage';
import { ProtectedRoute } from '@/components/shared';

export default function EditMovieRoute() {
  return (
    <ProtectedRoute>
      <EditMoviePage />
    </ProtectedRoute>
  );
}

