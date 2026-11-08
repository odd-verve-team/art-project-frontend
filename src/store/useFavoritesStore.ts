import { create } from 'zustand';

import { favoritesApi } from '@/services/api';

import type { Artwork, FavoriteItem } from '@/types/artwork';

interface FavoritesState {
  favorites: FavoriteItem[];
  favoriteArtworkIds: Set<number>;
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  favoriteArtworkIds: new Set(),
  isLoading: false,
  error: null,
};

interface FavoritesActions {
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (artwork: Artwork) => Promise<void>;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState & FavoritesActions>((set, get) => ({
    ...initialState,

    fetchFavorites: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await favoritesApi.getFavorites();
        const items = Array.isArray(response) ? response : response.data;

        set({
          favorites: items,
          favoriteArtworkIds: new Set(items.map((item) => item.artwork.id)),
        });
      } catch (error) {
        const errorMessage =
          (error as { message?: string })?.message ||
          'Failed to fetch favorites';
        set({ error: errorMessage });
      } finally {
        set({ isLoading: false });
      }
    },

    toggleFavorite: async (artwork) => {
      const prevFavorites = get().favorites;
      const prevIds = get().favoriteArtworkIds;

      const isFavorite = prevIds.has(artwork.id);

      let nextFavorites: FavoriteItem[];
      const nextIds = new Set(prevIds);

      if (isFavorite) {
        nextIds.delete(artwork.id);
        nextFavorites = prevFavorites.filter(
          (item) => item.artwork.id !== artwork.id,
        );
      } else {
        nextIds.add(artwork.id);
        nextFavorites = [...prevFavorites, { profile: 0, artwork }];
      }

      set({
        favorites: nextFavorites,
        favoriteArtworkIds: nextIds,
        error: null,
      });

      try {
        if (isFavorite) {
          await favoritesApi.removeFavorite(artwork.id);
        } else {
          await favoritesApi.addFavorite(artwork.id);
        }
      } catch (error) {
        set({
          favorites: prevFavorites,
          favoriteArtworkIds: prevIds,
          error:
            (error as { message?: string })?.message ||
            'Failed to update favorite',
        });
      }
    },

    clearFavorites: () => set(initialState),
  }),
);
