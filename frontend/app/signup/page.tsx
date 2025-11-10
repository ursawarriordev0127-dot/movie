'use client';

import SignupPage from '@/src/pages/auth/SignupPage';

// Force dynamic rendering to prevent prerendering issues with AuthProvider
export const dynamic = 'force-dynamic';

export default function Signup() {
  return <SignupPage />;
}

