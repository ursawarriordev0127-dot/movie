import { api } from '@/src/lib/api/client';
import { API_ENDPOINTS } from '@/src/constants';
import { AuthResponse, User } from '@/src/types';

export const authApi = {
  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNIN, {
        email,
        password,
      });
      
      // Ensure we return the data property
      if (!response.data) {
        throw new Error('No data in response');
      }
      
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  signUp: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNUP, {
      email,
      password,
    });
    return data;
  },

  getMe: async (): Promise<User> => {
    const { data } = await api.get<User>(API_ENDPOINTS.AUTH.ME);
    return data;
  },
};

