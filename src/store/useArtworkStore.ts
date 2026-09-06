import { create } from 'zustand';

import { artworksApi, type GetArtworksParams } from '@/services/api';
import type { Artwork } from '@/types/artwork';

interface ArtworkState {
  galleryArtworks: Artwork[];
  featuredArtworks: Artwork[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ArtworkState = {
  galleryArtworks: [],
  featuredArtworks: [],
  isLoading: false,
  error: null,
};

interface ArtworkActions {
  fetchGalleryArtworks: (params?: GetArtworksParams) => Promise<void>;
  fetchFeaturedArtworks: () => Promise<void>;
  clearError: () => void;
}

export const useArtworkStore = create<ArtworkState & ArtworkActions>((set) => ({
  ...initialState,

  fetchGalleryArtworks: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const arts = await artworksApi.getAll({ status: 'approved', ...params });
      set({ galleryArtworks: arts });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to load gallery pictures';
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedArtworks: async () => {
    set({ error: null });
    try {
      const arts = await artworksApi.getAll({ is_featured: true });
      set({ featuredArtworks: arts });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to load featured pictures';
      set({ error: errorMessage });
    }
  },

  clearError: () => set({ error: null }),
}));
