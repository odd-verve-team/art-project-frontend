import { create } from 'zustand';

import { artworksApi, type GetArtworksParams } from '@/services/api';

import type { Artwork, ArtworkSort, PaginationMeta } from '@/types/artwork';
import type { GalleryFilterState } from '@/types/gallery';
import { DEFAULT_FILTERS } from '@/components/features/Gallery/galleryConstants';

interface ArtworkState {
  galleryArtworks: Artwork[];
  featuredArtworks: Artwork[];
  currentArtwork: Artwork | null;
  meta: PaginationMeta | null;
  filters: GalleryFilterState,
  sort?: ArtworkSort,
  isLoading: boolean;
  error: string | null;
}

const initialState: ArtworkState = {
  galleryArtworks: [],
  featuredArtworks: [],
  currentArtwork: null,
  meta: null,
  filters: DEFAULT_FILTERS,
  sort: undefined,
  isLoading: false,
  error: null,
};

interface ArtworkActions {
  fetchGalleryArtworks: (params?: GetArtworksParams, append?: boolean) => Promise<void>;
  fetchFeaturedArtworks: () => Promise<void>;
  fetchArtworkById: (id: number) => Promise<void>;
  clearCurrentArtwork: () => void;
  setFilters: (filters: GalleryFilterState) => void;
  setSort: (sort?: ArtworkSort) => void;
  clearError: () => void;
}

export const useArtworkStore = create<ArtworkState & ArtworkActions>((set, get) => ({
  ...initialState,

  fetchGalleryArtworks: async (params, append = false) => {
    set({ isLoading: true, error: null });
    try {
      const response = await artworksApi.getAll(params);
      set((state) => ({
        galleryArtworks: append
          ? [...state.galleryArtworks, ...response.data]
          : response.data,
        meta: response.meta
      }));
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

  fetchArtworkById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const state = get();
      const cachedArtwork =
        state.galleryArtworks.find((art) => art.id === id) ||
        state.featuredArtworks.find((art) => art.id === id);
      
      if (cachedArtwork) {
        set({ currentArtwork: cachedArtwork, isLoading: false });
        return;
      }

      const artwork = await artworksApi.getById(id);
      set({ currentArtwork: artwork });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to load artwork details'
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  clearCurrentArtwork: () => set({ currentArtwork: null }),
  setFilters: (filters) => set({ filters }),
  setSort: (sort) => set({ sort }),
  clearError: () => set({ error: null }),
}));
