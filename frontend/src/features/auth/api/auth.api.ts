import { api } from '@/src/lib/api/client';
import { API_ENDPOINTS } from '@/src/constants';
import { AuthResponse, User } from '@/src/types';

export const authApi = {
  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.SIGNIN, {
        email,
        password,
      });
      
      // Backend uses TransformInterceptor which wraps response in { data: ..., statusCode: ... }
      // So response.data is { data: AuthResponse, statusCode: number }
      // We need to extract the actual AuthResponse from response.data.data
      const actualData = response.data?.data || response.data;
      
      if (!actualData) {
        throw new Error('No data in response');
      }
      
      // Ensure we have the expected structure
      if (!actualData.access_token || !actualData.user) {
        throw new Error('Invalid response structure from server');
      }
      
      return actualData as AuthResponse;
    } catch (error: any) {
      throw error;
    }
  },

  signUp: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.SIGNUP, {
        email,
        password,
      });
      
      // Backend uses TransformInterceptor which wraps response in { data: ..., statusCode: ... }
      // So response.data is { data: AuthResponse, statusCode: number }
      // We need to extract the actual AuthResponse from response.data.data
      const actualData = response.data?.data || response.data;
      
      if (!actualData) {
        throw new Error('No data in response');
      }
      
      // Ensure we have the expected structure
      if (!actualData.access_token || !actualData.user) {
        throw new Error('Invalid response structure from server');
      }
      
      return actualData as AuthResponse;
    } catch (error: any) {
      console.error('Signup API error:', {
        error,
        message: error?.message,
        response: error?.response,
        responseData: error?.response?.data,
        status: error?.response?.status,
      });
      throw error;
    }
  },

  getMe: async (): Promise<User> => {
    const response = await api.get(API_ENDPOINTS.AUTH.ME);
    
    // Backend uses TransformInterceptor which wraps response in { data: ..., statusCode: ... }
    // So response.data is { data: User, statusCode: number }
    // We need to extract the actual User from response.data.data
    const actualData = response.data?.data || response.data;
    
    if (!actualData) {
      throw new Error('No data in response');
    }
    
    return actualData as User;
  },
};

