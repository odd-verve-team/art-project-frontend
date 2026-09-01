import { Logo } from '@/components/ui/Logo';
import { HeaderNavigation } from '@/components/layout/Header/HeaderNavigation';
import { HeaderActions } from '@/components/layout/Header/HeaderActions';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  return (
    <header className="bg-primary grid grid-cols-3 items-center px-global pt-header">
      <div className="justify-self-start min-h-[64px]">
        {!isHomePage && <Logo />}
      </div>
      <div className="justify-self-center">
        <HeaderNavigation />
      </div>
      <div className="justify-self-end">
        {!isHomePage && <HeaderActions />}
      </div>
    </header>
  )
};
