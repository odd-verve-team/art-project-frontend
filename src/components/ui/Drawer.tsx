import { useEffect, useState } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  const [isMounted, setIsMounted] = useState(isOpen);

  if (isOpen && !isMounted) {
    setIsMounted(true);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      
      const timer = setTimeout(() => setIsMounted(false), 500);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isMounted) return null;

  const overlayClass = isOpen ? 'animate-fade-in' : 'animate-fade-out';
  const modalClass = isOpen ? 'animate-zoom-in' : 'animate-zoom-out';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-black/60 ${overlayClass}`}
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-[500px] max-h-[90vh] bg-primary text-background rounded-2xl shadow-2xl flex flex-col ${modalClass}`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-background text-[24px] hover:opacity-70 transition-opacity"
        >
          ✕
        </button>

        <div className="p-10 h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
