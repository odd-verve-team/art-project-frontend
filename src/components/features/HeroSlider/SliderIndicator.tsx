import { heroSlides } from "./sliderData";

export const SliderIndicator = () => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[10px] bottom-[68px]">
      {heroSlides.map((slide) => (
        <div
          key={slide.id}
          className="w-[1px] h-[13px] bg-background transition-all duration-500"
        />
      ))}
    </div>
  );
}