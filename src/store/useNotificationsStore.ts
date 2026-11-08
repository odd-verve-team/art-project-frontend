import { create } from 'zustand';

import type { NotificationItem } from '@/types/notifications';
import { notificationsApi } from '@/services/api';

interface NotificationsState {
  notifications: NotificationItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  notifications: [],
  isLoading: false,
  error: null,
}

interface NotificationsActions {
  fetchNotifications: () => Promise<void>;
  clearNotifications: () => void;
}

export const useNotificationsStore = create<NotificationsState & NotificationsActions>((set) => ({
  ...initialState,

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await notificationsApi.getNotifications();
      set({ notifications: response });
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        'Failed to fetch notifications';
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  clearNotifications: () => set(initialState),
}));