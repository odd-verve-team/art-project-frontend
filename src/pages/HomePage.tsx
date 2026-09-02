import { HeroSlider } from "@/components/features/HeroSlider/HeroSlider";
import { SliderIndicator } from "@/components/features/HeroSlider/SliderIndicator";
import { HeroFrame } from "@/components/ui/HeroFrame";
import { HeroLogo } from "@/components/ui/HeroLogo"

export const HomePage = () => {
  return (
    <div className="bg-primary min-h-[calc(100vh-102px)] relative w-full overflow-hidden">
      <HeroLogo />
      <HeroFrame />
      <HeroSlider />
      <SliderIndicator />
    </div>
  );
}