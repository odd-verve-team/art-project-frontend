import { HeroSlider } from '@/components/features/HeroSlider/HeroSlider';
import { HeroFrame } from '@/components/ui/HeroFrame';
import { HeroLogo } from '@/components/ui/HeroLogo';

export const HeroSection = () => {
  return (
    <section className="bg-primary min-h-[calc(100svh-var(--header-height))] relative">
      <HeroLogo />
      <HeroFrame />

      <div className="absolute z-0 inset-0 overflow-hidden">
        <HeroSlider />
      </div>
    </section>
  );
};
