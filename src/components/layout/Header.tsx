import { Logo } from '@/components/ui/Logo';
import { Navigation } from '@/components/layout/Navigation';
import { HeaderActions } from '@/components/layout/HeaderActions';

export const Header = () => {
  return (
    <header className='bg-primary flex justify-between items-center'>
      <Logo />
      <Navigation />
      <HeaderActions />
    </header>
  );
};
