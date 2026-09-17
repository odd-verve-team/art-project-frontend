import { create } from 'zustand';

import type { UserDetail, UserListItem } from '@/types/user';
import { usersApi } from '@/services/api';

interface UserState {
  users: UserListItem[];
  currentUser: UserDetail | null;
  detailedUsersCache: Record<number, UserDetail>;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  detailedUsersCache: {},
  isLoading: false,
  error: null,
}

interface UserActions {
  fetchAllUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
  clearCurrentUser: () => void;
}

export const useUserStore = create<UserState & UserActions>((set, get) => ({
  ...initialState,

  fetchAllUsers: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await usersApi.getAll();
      set({ users: response });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to load users'
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserById: async (id) => {
    const state = get();
    const cachedUser = state.detailedUsersCache[id];

    if (cachedUser) {
      set({ currentUser: cachedUser, error: null });
    }

    set({ isLoading: true, error: null });
    try {
      const response = await usersApi.getById(id);
      set((state) => ({
        currentUser: response,
        detailedUsersCache: {
          ...state.detailedUsersCache,
          [id]: response,
        },
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : `Failed to load user with ${id} ID`;
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  clearCurrentUser: () => set({ currentUser: null}),
}));