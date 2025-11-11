'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginPage from '@/src/pages/auth/LoginPage';
import { useAuth } from '@/src/providers';

// Force dynamic rendering to prevent prerendering issues with AuthProvider
export const dynamic = 'force-dynamic';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check token in localStorage as well
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    // Only redirect if we're done loading and (user exists OR token exists)
    if (!loading && (user || token)) {
      router.replace('/movies');
    }
  }, [user, loading, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="bg-[#093545] w-full min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!user) {
    return <LoginPage />;
  }

  // Show loading while redirecting (should be brief)
  return (
    <div className="bg-[#093545] w-full min-h-screen flex items-center justify-center">
      <p className="text-white text-xl">Redirecting...</p>
    </div>
  );
}

