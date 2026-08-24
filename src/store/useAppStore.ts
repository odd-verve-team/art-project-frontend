import { create } from 'zustand';

interface AppState {
  isLoading: boolean,
  isCartOpen: boolean,
}

const initialState = {
  isLoading: false,
  isCartOpen: false,
}

interface AppActions {
  setIsLoading: (isLoading: boolean) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  resetAppStore: () => void;
}

export const useAppStore = create<AppState & AppActions>((set) => ({
  ...initialState,

  setIsLoading: (isLoading) => set({ isLoading }),
  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  resetAppStore: () => set(initialState), 
}));