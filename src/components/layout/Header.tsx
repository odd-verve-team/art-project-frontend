import { Logo } from '@/components/ui/Logo';
import { Navigation } from '@/components/layout/Navigation';

export const Header = () => {
  return (
    <header className='bg-primary flex justify-between items-center'>
      <Logo />
      <Navigation />
    </header>
  );
};
