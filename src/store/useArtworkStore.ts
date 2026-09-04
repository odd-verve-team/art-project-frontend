import { create } from "zustand";

import { artworksApi, type GetArtworksParams } from "@/services/api";
import type { Artwork } from "@/types/artwork";

interface ArtworkState {
  artworks: Artwork[],
  isLoading: boolean,
  error: string | null,
}

const initialState: ArtworkState = {
  artworks: [],
  isLoading: false,
  error: null,
}

interface ArtworkActions {
  fetchArtworks: (params?: GetArtworksParams) => Promise<void>;
  clearError: () => void;
}

export const useArtworkStore = create<ArtworkState & ArtworkActions>((set) => ({
  ...initialState,

  fetchArtworks: async (params) => {
    set({ isLoading: true, error: null });

    try {
      const arts = await artworksApi.getAll(params)
      set({ artworks: arts })

    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Failed to load pictures';
      set({ error: errorMessage });

    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error : null }),
}))