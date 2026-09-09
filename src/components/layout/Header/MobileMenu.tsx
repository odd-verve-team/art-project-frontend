import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

import { NAV_ITEMS, HEADER_HOVER } from './headerConstants';

import SearchIcon from '@/assets/search-icon.svg';
import CloseIcon from '@/assets/close-icon.svg';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

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
          className={`
            fixed inset-0 z-50 flex flex-col 
            bg-primary px-global pt-header pb-[48px]
          `}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className={`
                text-background 
                ${HEADER_HOVER}
              `}
              aria-label="Close menu"
            >
              <img src={CloseIcon} aria-hidden="true" className="invert" />
            </button>

            <Link to="/search" onClick={onClose} className={HEADER_HOVER}>
              <img
                src={SearchIcon}
                alt="Search"
                className="w-[24px] h-[24px]"
              />
            </Link>
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center gap-[22px]">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => `
                  text-[52px] font-[700] text-background uppercase
                  ${HEADER_HOVER}
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
                ${HEADER_HOVER}
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
