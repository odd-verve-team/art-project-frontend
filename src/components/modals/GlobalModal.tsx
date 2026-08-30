import { useState } from 'react';
import { useAppStore, type ModalType } from '@/store/useAppStore';
import { Drawer } from '../ui/Drawer';
import { ContactUsForm } from './ContactUsForm';

export const GlobalModal = () => {
  const activeModal = useAppStore((state) => state.activeModal);
  const closeModal = useAppStore((state) => state.closeModal);

  const [cachedModal, setCachedModal] = useState<ModalType>(null);

  // Кешуємо тип модалки, щоб контент не зникав під час анімації закриття
  if (activeModal !== null && activeModal !== cachedModal) {
    setCachedModal(activeModal);
  }

  return (
    <Drawer isOpen={activeModal !== null} onClose={closeModal}>
      {cachedModal === 'contact-us' && <ContactUsForm />}
    </Drawer>
  );
};
