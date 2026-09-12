import type { ArtworkSort, ArtworksResponse } from '@/types/artwork';
import axios from 'axios';

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
}

export const artworksApi = {
  getAll: async (params?: GetArtworksParams): Promise<ArtworksResponse> => {
    const response = await api.get('/artworks', { params });
    return response.data;
  },
};
