import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { UserDetail } from '@/types/user';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserDetail | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
};

interface AuthActions {
  setTokens: (access: string, refresh: string, user: UserDetail) => void;
  setUser: (user: UserDetail) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,

      setTokens: (access, refresh, user) => {
        set({
          accessToken: access,
          refreshToken: refresh,
          user,
          isAuthenticated: true,
        });
      },

      setUser: (user) => {
        set({ user });
      },

      clearTokens: () => {
        set(initialState);
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
