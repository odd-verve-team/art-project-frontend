import axios from 'axios';

import type { Artwork, ArtworkSort, ArtworksResponse } from '@/types/artwork';
import type { UserDetail, UserListItem } from '@/types/user';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

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
