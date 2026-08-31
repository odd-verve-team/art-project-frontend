import { Logo } from '@/components/ui/Logo';
import { HeaderNavigation } from '@/components/layout/Header/HeaderNavigation';
import { HeaderActions } from '@/components/layout/Header/HeaderActions';

export const Header = () => {
  return (
    <header className="bg-primary flex justify-between items-center px-[48px] pt-[38px]">
      <Logo />
      <HeaderNavigation />
      <HeaderActions />
    </header>
  );
};
