import { useAuthStore } from '@/store/useAuthStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useNotificationsStore } from '@/store/useNotificationsStore';
import { useProfileStore } from '@/store/useProfileStore';

let isInitialized = false;
let unsubscribe: (() => void) | null = null;

const hydrate = () => {
  useProfileStore.getState().fetchProfile();
  useFavoritesStore.getState().fetchFavorites();
};

const reset = () => {
  useProfileStore.getState().clearProfile();
  useFavoritesStore.getState().clearFavorites();
  useNotificationsStore.getState().clearNotifications();
};

export const initSessionSync = (): (() => void) => {
  if (isInitialized && unsubscribe) {
    return unsubscribe;
  }

  isInitialized = true;

  if (useAuthStore.getState().isAuthenticated) {
    hydrate();
  }

  unsubscribe = useAuthStore.subscribe((state, prev) => {
    if (!prev.isAuthenticated && state.isAuthenticated) {
      hydrate();
    }

    if (prev.isAuthenticated && !state.isAuthenticated) {
      reset();
    }
  });

  return () => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
    isInitialized = false;
  };
};
