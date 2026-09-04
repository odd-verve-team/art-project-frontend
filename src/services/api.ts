import type { Artwork } from '@/types/artwork';
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
}

export const artworksApi = {
  getAll: async (params?: GetArtworksParams): Promise<Artwork[]> => {
    const response = await api.get('/artworks', { params });
    return response.data;
  },
};
