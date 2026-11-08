import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/store/useAuthStore';

import type { UserProfile } from '@/types/user';
import type { ArtistDetail, ArtistProfile } from '@/types/artist';
import type { ArtistArtworkListItem, Artwork, ArtworkDetail, ArtworkSort, ArtworksResponse, FavoriteItem, FavoritesResponse } from '@/types/artwork';
import type { AuthCodeRequest, AuthVerifyRequest, AuthResponse, RefreshResponse, RefreshRequest } from '@/types/auth';

import { normalizeApiError } from '@/utils/apiErrors';
import {
  getIsRefreshing,
  setIsRefreshing,
  addToQueue,
  processQueue,
} from '@/utils/tokenQueue';

export interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

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
  async (error) => {
    const originalRequest = error.config as RetryConfig;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {

      if (getIsRefreshing()) {
        return new Promise<string>((resolve, reject) => {
          addToQueue(resolve, reject);
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      setIsRefreshing(true);

      const refreshToken = useAuthStore.getState().refreshToken;

      if (!refreshToken) {
        setIsRefreshing(false);
        return Promise.reject(normalizeApiError(error));
      }

      try {
        const { data } = await axios.post<{
          access_token: string;
          refresh_token?: string;
        }>(`${baseURL}/users/refresh/`, { refresh_token: refreshToken });

        useAuthStore.getState().updateTokens(data);
        processQueue(null, data.access_token);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().clearTokens();
        window.location.href = '/login';
        return Promise.reject(normalizeApiError(refreshError));
      } finally {
        setIsRefreshing(false);
      }
    }

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
}

export const authApi = {
  sendCode: async (data: AuthCodeRequest): Promise<string> => {
    const response = await api.post('/users/code/', data);
    return response.data;
  },

  verifyCode: async (data: AuthVerifyRequest): Promise<AuthResponse> => {
    const response = await api.post('/users/authenticate/', data);
    return response.data;
  },

  refresh: async (data: RefreshRequest): Promise<RefreshResponse> => {
    const response = await api.post('/users/refresh/', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/users/logout/');
  },
};


export const profileApi = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get('/users/profile/');
    return response.data;
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await api.patch('/users/profile/', data);
    return response.data;
  },
};

export const artistsApi = {
  getProfile: async (): Promise<ArtistProfile> => {
    const response = await api.get('/artists/profile/');
    return response.data;
  },

  updateProfile: async (
    data: Partial<ArtistProfile>,
  ): Promise<ArtistProfile> => {
    const response = await api.patch('/artists/profile/', data);
    return response.data;
  },

  getArtworks: async (): Promise<ArtistArtworkListItem[]> => {
    const response = await api.get('/artists/artworks/');
    return response.data;
  },

  createArtwork: async (data: FormData): Promise<Artwork> => {
    const response = await api.post<Artwork>('/artists/artworks/', data);
    return response.data;
  },

  deleteArtwork: async (id: number): Promise<void> => {
    await api.delete(`/artists/artworks/${id}/`);
  },

  getArtistById: async (id: number): Promise<ArtistDetail> => {
    const response = await api.get(`/artists/${id}/`);
    return response.data;
  },
};

export const artworksApi = {
  getAll: async (params?: GetArtworksParams): Promise<ArtworksResponse> => {
    const response = await api.get('/artworks/', { params });
    return response.data;
  },

  getById: async (id: number): Promise<ArtworkDetail> => {
    const response = await api.get(`/artworks/${id}/`);
    return response.data;
  },

  search: async (text: string): Promise<Artwork[]> => {
    const response = await api.get('/artworks/search/', { params: { text } });
    return response.data;
  },
};

export const favoritesApi = {
  getFavorites: async (): Promise<FavoritesResponse> => {
    const response = await api.get('/favorites/');
    return response.data;
  },

  addFavorite: async (artworkId: number): Promise<FavoriteItem> => {
    const response = await api.post('/favorites/', { artwork: artworkId });
    return response.data;
  },

  removeFavorite: async (artworkId: number): Promise<void> => {
    await api.delete(`/favorites/${artworkId}/`);
  },
};