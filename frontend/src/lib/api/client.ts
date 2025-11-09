import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '@/src/constants';
import { ApiError } from '@/src/types';

const ROUTES_FIX = { HOME: '/' };

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - Add token
    this.client.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
          if (token) {
            // Ensure token is a string and trim any whitespace
            const cleanToken = String(token).trim();
            // Validate token format (JWT should have 3 parts separated by dots)
            if (cleanToken && cleanToken.split('.').length === 3) {
              config.headers.Authorization = `Bearer ${cleanToken}`;
            } else {
              localStorage.removeItem(STORAGE_KEYS.TOKEN);
              localStorage.removeItem(STORAGE_KEYS.USER);
            }
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor - Handle errors
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      },
    );
  }

  private handleUnauthorized(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      window.location.href = ROUTES_FIX.HOME;
    }
  }

  get instance(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient();
export const api = apiClient.instance;
