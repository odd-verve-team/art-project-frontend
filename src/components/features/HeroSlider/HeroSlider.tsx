import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { heroSlides } from './sliderData';
import { SliderIndicator } from './SliderIndicator';
import { useEffect } from 'react';

const SLIDE_DURATION = 10;

export const HeroSlider = () => {
  const totalSlides = heroSlides.length;
  const progress = useMotionValue(0);

  const x = useTransform(progress, [0, totalSlides], ['0%', '-50%']);

  useEffect(() => {
    const controls = animate(progress, totalSlides, {
      duration: SLIDE_DURATION,
      ease: 'linear',
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [totalSlides, progress]);

  return (
    <>
      <div className="w-full z-0 absolute top-1/2 -translate-y-1/2 overflow-hidden">
        <motion.div className="w-max flex items-center" style={{ x }}>
          {heroSlides.map((slide) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.alt}
              className="w-auto h-[246px] mr-[16px] object-cover shrink-0"
            />
          ))}
          {heroSlides.map((slide) => (
            <img
              key={`dup-${slide.id}`}
              src={slide.image}
              alt={slide.alt}
              className="w-auto h-[246px] mr-[16px] object-cover shrink-0"
            />
          ))}
        </motion.div>
      </div>

      <SliderIndicator progress={progress} totalSlides={totalSlides} />
    </>
  );
};