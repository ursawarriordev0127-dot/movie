'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../api/auth.api';
import { STORAGE_KEYS } from '@/src/constants';
import { User } from '@/src/types';

const ROUTES_FIX = {
  HOME: '/',
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) {
        const userData = await authApi.getMe();
        setUser(userData);
      }
    } catch (error) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    } finally {
      setLoading(false);
    }
  };

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const response = await authApi.signIn(email, password);
      
      // Check if response is valid
      if (!response) {
        throw new Error('No response received from server');
      }
      
      // Check if access_token exists (handle both direct property and nested)
      let accessToken: string | undefined;
      if (typeof response === 'object') {
        accessToken = (response as any).access_token;
        if (!accessToken && (response as any).data) {
          accessToken = (response as any).data.access_token;
        }
      }
      
      if (!accessToken) {
        throw new Error('Invalid response from server: missing access_token');
      }
      
      // Ensure token is properly formatted
      const token = String(accessToken).trim();
      
      if (!token || token.length < 10) {
        throw new Error('Invalid token received from server: token is too short');
      }
      
      if (token.split('.').length !== 3) {
        throw new Error('Invalid JWT token format received from server');
      }
      
      // Get user data
      const userData = (response as any).user || (response as any).data?.user;
      if (!userData) {
        throw new Error('Invalid response from server: missing user data');
      }
      
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      setUser(userData);
      return response;
    } catch (error: any) {
      // Clear any stale data on error
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      setUser(null);
      throw error;
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const response = await authApi.signUp(email, password);
    // Validate token before storing
    if (!response.access_token || typeof response.access_token !== 'string') {
      throw new Error('Invalid token received from server');
    }
    // Ensure token is properly formatted
    const token = String(response.access_token).trim();
    if (token.split('.').length !== 3) {
      throw new Error('Invalid JWT token format');
    }
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
    setUser(response.user);
    return response;
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
    router.push(ROUTES_FIX.HOME);
  }, [router]);

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };
};
