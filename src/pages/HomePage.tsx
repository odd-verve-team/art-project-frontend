import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { HeroSection } from '@/components/features/HeroSection';
import { AboutSection } from '@/components/features/AboutSection';
import { FeaturedArtworks } from '@/components/features/Artworks/FeaturedArtworks';

export const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="w-full">
      <HeroSection />

      <div className="w-full px-global">
        <div className="max-w-[1440px] mx-auto w-full">
          <AboutSection />
          <FeaturedArtworks />
        </div>
      </div>
    </div>
  );
};
