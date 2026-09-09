import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { Logo } from '@/components/ui/Logo';
import { HeaderNavigation } from '@/components/layout/Header/HeaderNavigation';
import { HeaderActions } from '@/components/layout/Header/HeaderActions';
import { MobileMenu } from './MobileMenu';

import BurgerIcon from '@/assets/burger-icon.svg';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          '--header-height',
          `${height}px`,
        );
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return (
    <header ref={headerRef} className="w-full px-global pt-header bg-primary">
      <div
        className={`
          max-w-[1440px] mx-auto w-full items-center
          ${
            isHomePage
              ? 'flex justify-center md:grid md:grid-cols-3'
              : 'flex justify-between xl:grid xl:grid-cols-3'
          }
        `}
      >
        <div
          className={`
            min-h-[64px] flex items-center
            ${isHomePage ? 'md:justify-self-start' : 'xl:justify-self-start'}
          `}
        >
          {!isHomePage && <Logo />}
        </div>

        <div
          className={`
            hidden 
            ${isHomePage ? 'md:block md:justify-self-center' : 'xl:block xl:justify-self-center'}
          `}
        >
          <HeaderNavigation />
        </div>

        <div
          className={`
            hidden 
            ${isHomePage ? 'md:flex md:justify-self-end' : 'xl:flex xl:justify-self-end'}
          `}
        >
          {!isHomePage && <HeaderActions />}
        </div>

        <button
          className={`
            block
            ${isHomePage ? 'translate-y-[6px] md:hidden' : 'xl:hidden xl:translate-y-0'}
          `}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <img src={BurgerIcon} alt="Menu" />
        </button>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};
