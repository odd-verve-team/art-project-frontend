import type { MotionValue } from 'framer-motion';
import { heroSlides } from './sliderData';
import { IndicatorLine } from './IndicatorLine';

interface SliderIndicatorProps {
  progress: MotionValue<number>;
  totalSlides: number;
}

export const SliderIndicator = ({
  progress,
  totalSlides,
}: SliderIndicatorProps) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 flex items-center h-[24px] gap-[10px] bottom-[68px]">
      {heroSlides.map((slide, index) => (
        <IndicatorLine
          key={slide.id}
          index={index}
          progress={progress}
          totalSlides={totalSlides}
        />
      ))}
    </div>
  );
};
