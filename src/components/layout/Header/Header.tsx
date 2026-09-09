import { useState } from 'react';
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

  return (
    <header
      className={`
        w-full items-center px-global pt-header bg-primary
        ${isHomePage ? 'flex justify-center' : 'flex justify-between'}
        lg:grid lg:grid-cols-3
      `}
    >
      <div className="lg:justify-self-start min-h-[64px] flex items-center">
        {!isHomePage && <Logo />}
      </div>

      <div className="hidden lg:block lg:justify-self-center">
        <HeaderNavigation />
      </div>

      <div className="hidden lg:flex lg:justify-self-end">
        {!isHomePage && <HeaderActions />}
      </div>

      <button
        className="block lg:hidden"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <img src={BurgerIcon} alt="Menu" />
      </button>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};
