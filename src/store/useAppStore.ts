import { create } from 'zustand';

export type ModalType = 'contact-us' | null;

interface AppState {
  activeModal: ModalType,
  isLoading: boolean,
  isCartOpen: boolean,
}

const initialState = {
  activeModal: null,
  isLoading: false,
  isCartOpen: false,
};

interface AppActions {
  setIsLoading: (isLoading: boolean) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  openModal: (modalToOpen: ModalType) => void;
  closeModal: () => void;
  resetAppStore: () => void;
}

export const useAppStore = create<AppState & AppActions>((set) => ({
  ...initialState,

  setIsLoading: (isLoading) => set({ isLoading }),
  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

  openModal: (modalToOpen) => set({ activeModal: modalToOpen }),
  closeModal: () => set({ activeModal: null }),

  resetAppStore: () => set(initialState), 
}));