'use client';

import { CreateMoviePage } from '@/src/pages/movies/CreateMoviePage';
import { ProtectedRoute } from '@/components/shared';

// Force dynamic rendering to prevent prerendering issues with AuthProvider
export const dynamic = 'force-dynamic';

export default function CreateMovieRoute() {
  return (
    <ProtectedRoute>
      <CreateMoviePage />
    </ProtectedRoute>
  );
}

