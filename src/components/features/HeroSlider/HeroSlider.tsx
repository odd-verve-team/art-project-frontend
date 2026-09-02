import { heroSlides as slides } from '@/components/features/HeroSlider/sliderData';

export const HeroSlider = () => {
    return (
        <div className="w-full z-0 absolute top-1/2 -translate-y-1/2 overflow-hidden">
            <div className="flex gap-[16px] items-center">
                {slides.map((slide) => (
                    <img key={slide.id} src={slide.image} alt={slide.alt} className="w-full h-full object-cover"/>
                ))}
            </div>
        </div>
    );
};