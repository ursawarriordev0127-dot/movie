'use client';

import { EditMoviePage } from '@/src/pages/movies/EditMoviePage';
import { ProtectedRoute } from '@/components/shared';

// Force dynamic rendering to prevent prerendering issues with AuthProvider
export const dynamic = 'force-dynamic';

export default function EditMovieRoute() {
  return (
    <ProtectedRoute>
      <EditMoviePage />
    </ProtectedRoute>
  );
}

