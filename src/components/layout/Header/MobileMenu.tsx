import { useAppStore } from '@/store/useAppStore';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import SearchIcon from '@/assets/search-icon.svg';
import CloseIcon from '@/assets/close-icon.svg';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT', path: '/#about' },
  { label: 'GALLERY', path: '/gallery' },
  { label: 'PROFILE', path: '/profile' },
];

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const openModal = useAppStore((state) => state.openModal);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col bg-primary px-global pt-header pb-[48px]"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-background hover:opacity-70 transition-opacity"
              aria-label="Close menu"
            >
              <img src={CloseIcon} aria-hidden="true" className="invert" />
            </button>

            <Link
              to="/search"
              onClick={onClose}
              className="hover:opacity-70 transition-opacity"
            >
              <img
                src={SearchIcon}
                alt="Search"
                className="w-[24px] h-[24px]"
              />
            </Link>
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center gap-[40px]">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => `
                  text-[32px] font-[600] text-background transition-opacity duration-300
                  ${isActive && !item.path.includes('#') ? 'opacity-100' : 'opacity-70 hover:opacity-100'}
                `}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex justify-center">
            <button
              onClick={() => {
                onClose();
                openModal('contact-us');
              }}
              className={`
                w-[164px] h-[43px] border-[1px] border-background 
                text-[12px] font-[500] text-background uppercase tracking-[0.1em] 
                transition-all duration-500 hover:opacity-70
              `}
            >
              contact us
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
