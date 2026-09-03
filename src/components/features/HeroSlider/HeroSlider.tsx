import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from 'framer-motion';
import { heroSlides } from './sliderData';
import { SliderIndicator } from './SliderIndicator';
import { SpeedControl } from './SpeedControl';
import { useEffect, useRef, useCallback, useState } from 'react';

const BASE_DURATION = 10; // Auto-scroll: seconds per full cycle at 1× speed
const SLIDER_DELAY = 1.5; // When slider starts entering from right (seconds)
const CONTROLS_DELAY = 0.2; // Pause before controls appear after slider fills viewport

export const HeroSlider = () => {
  const totalSlides = heroSlides.length;
  const progress = useMotionValue(0);
  const entranceX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth : 2000,
  );

  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const entranceRef = useRef<ReturnType<typeof animate> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isEntranceDone = useRef(false);

  const [speed, setSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);


  const scrollX = useTransform(progress, (p) => {
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

    const duration = BASE_DURATION / speed;
    const remainingFraction = (totalSlides - normalized) / totalSlides;

    controlsRef.current = animate(progress, totalSlides, {
      duration: duration * remainingFraction,
      ease: 'linear',
      onComplete: () => {
        progress.set(0);
        controlsRef.current = animate(progress, totalSlides, {
          duration,
          ease: 'linear',
          repeat: Infinity,
        });
      },
    });
  }, [progress, totalSlides, speed]);


  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const viewportWidth = window.innerWidth;
        const halfTrackWidth = trackRef.current?.scrollWidth
          ? trackRef.current.scrollWidth / 2
          : viewportWidth * 3;

        const autoScrollSpeed = halfTrackWidth / BASE_DURATION;
        const entranceDuration = viewportWidth / autoScrollSpeed;

        entranceX.set(viewportWidth);

        entranceRef.current = animate(entranceX, 0, {
          duration: entranceDuration,
          ease: 'linear',
          delay: SLIDER_DELAY,
          onComplete: () => {
            isEntranceDone.current = true;
            startAutoScroll();
            setTimeout(() => setShowControls(true), CONTROLS_DELAY * 1000);
          },
        });
      });
    });

    return () => {
      entranceRef.current?.stop();
      controlsRef.current?.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- runs once on mount

  useEffect(() => {
    if (isEntranceDone.current) {
      startAutoScroll();
    }
    return () => controlsRef.current?.stop();
  }, [startAutoScroll]);


  const handleSliderPanStart = () => {
    if (!isEntranceDone.current) return;
    stopAutoScroll();
  };

  const handleSliderPan = (_event: PointerEvent, info: PanInfo) => {
    if (!isEntranceDone.current || !trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    const deltaProgress = (-info.delta.x / halfWidth) * totalSlides;
    progress.set(progress.get() + deltaProgress);
  };

  const handleSliderPanEnd = () => {
    if (!isEntranceDone.current) return;
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
        <motion.div style={{ x: entranceX }}>
          <motion.div
            ref={trackRef}
            className="w-max flex items-center"
            style={{ x: scrollX }}
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
      </motion.div>

      {showControls && (
        <>
          <SliderIndicator
            progress={progress}
            totalSlides={totalSlides}
            onScrubStart={stopAutoScroll}
            onScrubEnd={startAutoScroll}
          />
          <SpeedControl speed={speed} onSpeedChange={setSpeed} />
        </>
      )}
    </>
  );
};
