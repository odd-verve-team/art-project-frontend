import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from 'framer-motion';
import { heroSlides } from './sliderData';
import { SliderIndicator } from './SliderIndicator';
import { useEffect, useRef, useCallback } from 'react';

const SLIDE_DURATION = 10;

export const HeroSlider = () => {
  const totalSlides = heroSlides.length;
  const progress = useMotionValue(0);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const x = useTransform(progress, (p) => {
    const normalized = ((p % totalSlides) + totalSlides) % totalSlides;
    return `${-(normalized / totalSlides) * 50}%`;
  });

  const stopAutoScroll = useCallback(() => {
    controlsRef.current?.stop();
  }, []);

  const startAutoScroll = useCallback(() => {
    controlsRef.current?.stop();

    const current = progress.get();
    const normalized = ((current % totalSlides) + totalSlides) % totalSlides;
    progress.set(normalized);

    const remainingFraction = (totalSlides - normalized) / totalSlides;

    controlsRef.current = animate(progress, totalSlides, {
      duration: SLIDE_DURATION * remainingFraction,
      ease: 'linear',
      onComplete: () => {
        progress.set(0);
        controlsRef.current = animate(progress, totalSlides, {
          duration: SLIDE_DURATION,
          ease: 'linear',
          repeat: Infinity,
        });
      },
    });
  }, [progress, totalSlides]);

  useEffect(() => {
    startAutoScroll();
    return () => controlsRef.current?.stop();
  }, [startAutoScroll]);

  // --- Slider drag ---

  const handleSliderPanStart = () => {
    stopAutoScroll();
  };

  const handleSliderPan = (_event: PointerEvent, info: PanInfo) => {
    if (!trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    const deltaProgress = (-info.delta.x / halfWidth) * totalSlides;
    progress.set(progress.get() + deltaProgress);
  };

  const handleSliderPanEnd = () => {
    startAutoScroll();
  };

  return (
    <>
      <motion.div
        className="w-full z-0 absolute top-1/2 -translate-y-1/2 overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
        onPanStart={handleSliderPanStart}
        onPan={handleSliderPan}
        onPanEnd={handleSliderPanEnd}
      >
        <motion.div
          ref={trackRef}
          className="w-max flex items-center"
          style={{ x }}
        >
          {heroSlides.map((slide) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.alt}
              className="w-auto h-[246px] mr-[16px] object-cover shrink-0 select-none pointer-events-none"
              draggable={false}
            />
          ))}
          {heroSlides.map((slide) => (
            <img
              key={`dup-${slide.id}`}
              src={slide.image}
              alt={slide.alt}
              className="w-auto h-[246px] mr-[16px] object-cover shrink-0 select-none pointer-events-none"
              draggable={false}
            />
          ))}
        </motion.div>
      </motion.div>

      <SliderIndicator
        progress={progress}
        totalSlides={totalSlides}
        onScrubStart={stopAutoScroll}
        onScrubEnd={startAutoScroll}
      />
    </>
  );
};
