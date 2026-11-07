import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { UserDetail } from '@/types/user';
import type { AuthTokens } from '@/types/auth';

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
  setTokens: (tokens: AuthTokens, user: UserDetail) => void;
  updateTokens: (tokens: { access_token: string; refresh_token?: string }) => void;
  setUser: (user: UserDetail) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,

      setTokens: (tokens, user) => {
        set({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          user,
          isAuthenticated: true,
        });
      },

      updateTokens: (tokens) => {
        set((state) => ({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token
            ? tokens.refresh_token
            : state.refreshToken,
        }));
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
