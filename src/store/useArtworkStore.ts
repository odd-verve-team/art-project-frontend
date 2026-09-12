import { create } from 'zustand';

import { artworksApi, type GetArtworksParams } from '@/services/api';
import type { Artwork, ArtworkSort, PaginationMeta } from '@/types/artwork';
import type { GalleryFilterState } from '@/types/gallery';
import { DEFAULT_FILTERS } from '@/components/features/Gallery/galleryConstants';

interface ArtworkState {
  galleryArtworks: Artwork[];
  featuredArtworks: Artwork[];
  meta: PaginationMeta | null;
  filters: GalleryFilterState,
  sort?: ArtworkSort,
  isLoading: boolean;
  error: string | null;
}

const initialState: ArtworkState = {
  galleryArtworks: [],
  featuredArtworks: [],
  meta: null,
  filters: DEFAULT_FILTERS,
  sort: undefined,
  isLoading: false,
  error: null,
};

interface ArtworkActions {
  fetchGalleryArtworks: (params?: GetArtworksParams) => Promise<void>;
  fetchFeaturedArtworks: () => Promise<void>;
  setFilters: (filters: GalleryFilterState) => void;
  setSort: (sort?: ArtworkSort) => void;
  clearError: () => void;
}

export const useArtworkStore = create<ArtworkState & ArtworkActions>((set) => ({
  ...initialState,

  fetchGalleryArtworks: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await artworksApi.getAll(params);
      set({
        galleryArtworks: response.data,
        meta: response.meta
      });
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
      const response = await artworksApi.getAll({ is_featured: true });
      set({ featuredArtworks: response.data });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to load featured pictures';
      set({ error: errorMessage });
    }
  },

  setFilters: (filters) => set({ filters }),
  setSort: (sort) => set({ sort }),
  clearError: () => set({ error: null }),
}));
