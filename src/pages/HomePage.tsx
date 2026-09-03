import { AboutSection } from "@/components/features/AboutSection";
import { HeroSlider } from "@/components/features/HeroSlider/HeroSlider";
import { HeroFrame } from "@/components/ui/HeroFrame";
import { HeroLogo } from "@/components/ui/HeroLogo"

export const HomePage = () => {
  return (
    <div className="w-full">
      <div className="bg-primary min-h-[calc(100vh-102px)] relative overflow-hidden">
        <HeroLogo />
        <HeroFrame />
        <HeroSlider />
      </div>
      <div className="mx-global">
        <AboutSection />
      </div>
    </div>
  );
}