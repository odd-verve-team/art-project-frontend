import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ArrowIcon from '@/assets/social-arrow-icon.svg';

const PROFILE_TABS = [
  { name: 'Favorites', href: '/profile/favorites' },
  { name: 'Profile Settings', href: '/profile/settings' },
  { name: 'Prefereces & Notifications', href: '/profile/notifications' },
];

const TAB_LINK_BASE = `
  text - [12px] / [24px] font - [500] tracking - [1px] uppercase
  transition-opacity hover:opacity-70 duration-300
`;

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

  return (
    <div ref={menuRef} className="relative w-full mb-[16px] z-[100]">
      <div className="flex justify-end lg:hidden">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`
            flex items-center gap-[6px] outline-none
            ${TAB_LINK_BASE}
          `}
        >
          <img
            src={ArrowIcon}
            aria-hidden="true"
            className={`
              w-[8px] h-[8px] mt-[2px] invert -rotate-45 
              transition-transform duration-200
              ${isOpen ? 'rotate-135' : ''}
            `}
          />
          <span className="underline underline-offset-[4px]">
            {activeTab.name}
          </span>
        </button>

        {isOpen && (
          <div
            className={`
              absolute right-0 top-full mt-[5px] min-w-[250px]
              flex flex-col items-end gap-[16px] p-[16px]
              bg-background border-primary border-[1px]
            `}
          >
            {PROFILE_TABS.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <Link
                  key={tab.name}
                  to={tab.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    ${TAB_LINK_BASE}
                    ${isActive ? 'underline underline-offset-[4px]' : ''}
                  `}
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
