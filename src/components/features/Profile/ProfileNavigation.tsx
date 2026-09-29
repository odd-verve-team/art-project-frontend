import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/utils/cn';
import ArrowIcon from '@/assets/social-arrow-icon.svg';

// #region Constants & Styles
const PROFILE_TABS = [
  { name: 'My Arts', href: '/profile/arts' },
  { name: 'Favorites', href: '/profile/favorites' },
  { name: 'Profile Settings', href: '/profile/settings' },
  { name: 'Prefereces & Notifications', href: '/profile/notifications' },
];

const TAB_LINK_BASE = `
  text-[12px]/[24px] font-[500] tracking-[1px] uppercase
  transition-opacity duration-300
  hover:opacity-70
`;
// #endregion

export const ProfileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const activeTab =
    PROFILE_TABS.find((tab) => tab.href === pathname) || PROFILE_TABS[0];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div
      ref={menuRef}
      className={`
        relative w-full mb-[16px] z-[100]
      `}
    >
      <div className="flex justify-end lg:hidden">
        <button
          onClick={toggleMenu}
          className={cn(
            'flex items-center gap-[6px] outline-none',
            TAB_LINK_BASE
          )}
        >
          <img
            src={ArrowIcon}
            aria-hidden="true"
            className={cn(
              `w-[8px] h-[8px] invert transition-transform duration-300 ease-in-out`,
              '-rotate-45',
              isOpen && 'rotate-[135deg]'
            )}
          />
          <span className="underline underline-offset-[4px]">
            {activeTab.name}
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="profile-nav-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: { duration: 0.3, ease: 'easeInOut' },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15, ease: 'easeOut' },
              }}
              className={`
                absolute right-0 top-full mt-[5px] 
                min-w-[250px] overflow-hidden 
                bg-background border-primary border-[1px]
              `}
            >
              <div className="flex flex-col items-end gap-[16px] p-[16px]">
                {PROFILE_TABS.map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <Link
                      key={tab.name}
                      to={tab.href}
                      onClick={closeMenu}
                      className={cn(
                        TAB_LINK_BASE,
                        isActive && 'underline underline-offset-[4px]'
                      )}
                    >
                      {tab.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
