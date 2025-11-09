'use client';

import React, { createContext, useContext } from 'react';
import { useAuth as useAuthHook } from '@/src/features/auth/hooks/useAuth';
import { User } from '@/src/types';

type AuthContextType = ReturnType<typeof useAuthHook>;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useAuthHook();

  return (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // During SSR/prerendering, provide a default context instead of throwing
    if (typeof window === 'undefined') {
      // Return a safe default during SSR that matches the useAuth hook return type
      return {
        user: null,
        loading: true,
        signIn: async () => {},
        signUp: async () => {},
        signOut: async () => {},
        isAuthenticated: false,
      } as AuthContextType;
    }
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

