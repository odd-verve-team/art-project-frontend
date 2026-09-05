import { useLocation } from "react-router-dom";

import { AboutSection } from "@/components/features/AboutSection";
import { HeroSlider } from "@/components/features/HeroSlider/HeroSlider";
import { HeroFrame } from "@/components/ui/HeroFrame";
import { HeroLogo } from "@/components/ui/HeroLogo"
import { useEffect } from "react";
import { FeaturedArtworks } from "@/components/features/Artworks/FeaturedArtworks";

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
      <div className="bg-primary min-h-[calc(100vh-102px)] relative overflow-hidden">
        <HeroLogo />
        <HeroFrame />
        <HeroSlider />
      </div>
      <div className="mx-global">
        <AboutSection />
        <FeaturedArtworks />
      </div>
    </div>
  );
}