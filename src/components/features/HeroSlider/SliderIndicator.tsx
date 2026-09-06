import { motion, type MotionValue, type PanInfo } from 'framer-motion';
import { heroSlides } from './sliderData';
import { IndicatorLine } from './IndicatorLine';
import { useRef } from 'react';

interface SliderIndicatorProps {
  progress: MotionValue<number>;
  totalSlides: number;
  onScrubStart: () => void;
  onScrubEnd: () => void;
}

export const SliderIndicator = ({
  progress,
  totalSlides,
  onScrubStart,
  onScrubEnd,
}: SliderIndicatorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePanStart = () => {
    onScrubStart();
  };

  const handlePan = (_event: PointerEvent, info: PanInfo) => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    const deltaProgress = (info.delta.x / width) * totalSlides;
    progress.set(progress.get() + deltaProgress);
  };

  const handlePanEnd = () => {
    onScrubEnd();
  };

  return (
    <motion.div
      ref={containerRef}
      className="absolute left-1/2 -translate-x-1/2 flex items-center h-[24px] gap-[10px] bottom-[68px] cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onPanStart={handlePanStart}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
    >
      {heroSlides.map((slide, index) => (
        <IndicatorLine
          key={slide.id}
          index={index}
          progress={progress}
          totalSlides={totalSlides}
        />
      ))}
    </motion.div>
  );
};
