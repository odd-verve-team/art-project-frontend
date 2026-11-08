import { create } from 'zustand';

import { artistsApi, profileApi } from '@/services/api';
import { useAuthStore } from './useAuthStore';

import type { ArtistProfile } from '@/types/artist';
import type { UserProfile } from '@/types/user';

interface ProfileState {
  profile: UserProfile | ArtistProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
}

interface ProfileActions {
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile> | Partial<ArtistProfile>) => Promise<void>;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState & ProfileActions>((set) => ({
  ...initialState,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const role = useAuthStore.getState().user?.role;
      const profile = role === 'artist'
        ? await artistsApi.getProfile()
        : await profileApi.getProfile();

      set({ profile });
    } catch (error) {
      set({
        error: error instanceof Error
          ? error.message
          : 'Failed to fetch profile'
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const role = useAuthStore.getState().user?.role;
      const profile =
        role === 'artist'
          ? await artistsApi.updateProfile(data as Partial<ArtistProfile>)
          : await profileApi.updateProfile(data as Partial<UserProfile>);
      set({ profile });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update profile';
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  clearProfile: () => set(initialState),
}));