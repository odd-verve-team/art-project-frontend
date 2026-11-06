import axios from 'axios';

import { useAuthStore } from '@/store/useAuthStore';

import type { Artwork, ArtworkSort, ArtworksResponse } from '@/types/artwork';
import type { UserDetail, UserListItem } from '@/types/user';
import type { AuthCodeRequest, AuthVerifyRequest, AuthResponse } from '@/types/auth';

import { normalizeApiError } from '@/utils/apiErrors';

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error('VITE_API_BASE_URL environment variable is required');
}

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData && config.headers) {
    config.headers.delete('Content-Type');
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = normalizeApiError(error);
    return Promise.reject(normalizedError);
  },
);

export interface GetArtworksParams {
  is_featured?: boolean;
  status?: string;
  price_lte?: number;
  year_lte?: number;
  category?: string;
  medium?: string;
  size?: string;
  sort?: ArtworkSort;
  page?: number;
  limit?: number;
  artist?: number;
}

export const artworksApi = {
  getAll: async (params?: GetArtworksParams): Promise<ArtworksResponse> => {
    const response = await api.get('/artworks/', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Artwork> => {
    const response = await api.get(`/artworks/${id}/`);
    return response.data;
  },
};

export const usersApi = {
  getAll: async (): Promise<UserListItem[]> => {
    const response = await api.get('/users/');
    return response.data;
  },

  getById: async (id: number): Promise<UserDetail> => {
    const response = await api.get(`/users/${id}/`);
    return response.data;
  },
};

export const authApi = {
  sendCode: async (data: AuthCodeRequest): Promise<string> => {
    const response = await api.post('/users/code/', data);
    return response.data;
  },

  verifyCode: async (data: AuthVerifyRequest): Promise<AuthResponse> => {
    const response = await api.post('/users/authenticate/', data);
    return response.data;
  },
};