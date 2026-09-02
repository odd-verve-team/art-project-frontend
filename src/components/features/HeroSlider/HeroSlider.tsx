import { heroSlides as slides } from '@/components/features/HeroSlider/sliderData';
import { motion } from 'framer-motion';

export const HeroSlider = () => {

  const infinityTransition = {
    ease: 'linear',
    duration: 25,
    repeat: Infinity,
  } as const;

    return (
      <div className="w-full z-0 absolute top-1/2 -translate-y-1/2 overflow-hidden">
        <motion.div
          className="w-max flex items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={infinityTransition}
        >
          {slides.map((slide) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.alt}
              className="w-auto h-[246px] mr-[16px] object-cover shrink-0"
            />
          ))}
          {slides.map((slide) => (
            <img
              key={`dup-${slide.id}`}
              src={slide.image}
              alt={slide.alt}
              className="w-auto h-[246px] mr-[16px] object-cover shrink-0"
            />
          ))}
        </motion.div>
      </div>
    );
};