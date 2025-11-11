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
      
      // Validate response structure (API layer should have already handled this)
      if (!response || !response.access_token || !response.user) {
        throw new Error('Invalid response from server');
      }
      
      // Validate token format
      const token = String(response.access_token).trim();
      if (!token || token.length === 0) {
        throw new Error('Token is empty');
      }
      
      // Validate JWT format (should have 3 parts separated by dots)
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        throw new Error('Invalid JWT token format');
      }
      
      // Store token and user data
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      setUser(response.user);
      
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
    try {
      const response = await authApi.signUp(email, password);
      
      // Validate response structure (API layer should have already handled this)
      if (!response || !response.access_token || !response.user) {
        throw new Error('Invalid response from server');
      }
      
      // Validate token format
      const token = String(response.access_token).trim();
      if (!token || token.length === 0) {
        throw new Error('Token is empty');
      }
      
      // Validate JWT format (should have 3 parts separated by dots)
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        throw new Error('Invalid JWT token format');
      }
      
      // Store token and user data
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      setUser(response.user);
      
      return response;
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Clear any stale data on error
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      setUser(null);
      throw error;
    }
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
