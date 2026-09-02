import { type MotionValue, motion, useTransform } from 'framer-motion';

interface IndicatorLineProps {
  index: number;
  progress: MotionValue<number>;
  totalSlides: number;
}

const MAX_HEIGHT = 24;
const MIN_HEIGHT = 8;
const WAVE_RADIUS = 2;

const getWaveDistance = (
  progress: number,
  index: number,
  totalSlides: number,
) => {
  return Math.min(
    Math.abs(progress - index),
    Math.abs(progress - (index + totalSlides)),
  );
};

const cosineEase = (dist: number, radius: number) => {
  if (dist >= radius) return 0;
  return (1 + Math.cos(Math.PI * (dist / radius))) / 2;
};

export const IndicatorLine = ({
  index,
  progress,
  totalSlides,
}: IndicatorLineProps) => {
  const scaleY = useTransform(progress, (p) => {
    const dist = getWaveDistance(p, index, totalSlides);
    const ease = cosineEase(dist, WAVE_RADIUS);
    return (MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT) * ease) / MAX_HEIGHT;
  });

  const opacity = useTransform(progress, (p) => {
    const dist = getWaveDistance(p, index, totalSlides);
    const ease = cosineEase(dist, WAVE_RADIUS);
    return 0.4 + 0.6 * ease;
  });

  return (
    <motion.div
      className="w-[1px] bg-background shrink-0 rounded-full"
      style={{
        height: MAX_HEIGHT,
        scaleY,
        opacity,
        willChange: 'transform, opacity',
      }}
    />
  );
};
