import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { useRef } from 'react';

interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  skipAnimation?: boolean;
}

const MIN_SPEED = 0.1;
const MAX_SPEED = 50;
const TRACK_WIDTH = 100;

const speedToX = (s: number) =>
  ((Math.log(s) - Math.log(MIN_SPEED)) /
    (Math.log(MAX_SPEED) - Math.log(MIN_SPEED))) *
  TRACK_WIDTH;

const xToSpeed = (x: number) =>
  Math.exp(
    Math.log(MIN_SPEED) +
      (x / TRACK_WIDTH) * (Math.log(MAX_SPEED) - Math.log(MIN_SPEED)),
  );

const formatSpeed = (s: number) => {
  const r = Math.round(s * 10) / 10;
  return r % 1 === 0 ? r.toFixed(0) : r.toFixed(1);
};

export const SpeedControl = ({ speed, onSpeedChange, skipAnimation }: SpeedControlProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(speedToX(speed));

  const updateSpeed = (newX: number) => {
    const clamped = Math.max(0, Math.min(TRACK_WIDTH, newX));
    dragX.set(clamped);
    onSpeedChange(Math.round(xToSpeed(clamped) * 10) / 10);
  };

  const handlePan = (_event: PointerEvent, info: PanInfo) => {
    updateSpeed(dragX.get() + info.delta.x);
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    updateSpeed(e.clientX - rect.left);
  };

  return (
    <motion.div
      className="absolute bottom-[185px] left-1/2 -translate-x-1/2 flex flex-col items-center"
      initial={skipAnimation ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={skipAnimation ? undefined : { duration: 0.4, ease: 'easeOut' }}
    >
      <div
        ref={trackRef}
        className="relative h-[20px] flex items-center cursor-pointer"
        style={{ width: TRACK_WIDTH }}
        onClick={handleTrackClick}
      >
        <div className="absolute w-full h-[1px] bg-background/20 rounded-full" />

        <motion.div
          className="absolute h-[1px] bg-background/50 rounded-full"
          style={{ 
            width: TRACK_WIDTH,
            scaleX: useTransform(dragX, (x) => x / TRACK_WIDTH),
            transformOrigin: 'left',
            willChange: 'transform'
          }}
        />

        <motion.div
          className="absolute w-[6px] h-[6px] rounded-full bg-background/70 cursor-grab active:cursor-grabbing"
          style={{ x: dragX, marginLeft: -3, touchAction: 'none', willChange: 'transform' }}
          onPan={handlePan}
        />
      </div>

      <span className="text-background/30 text-[10px] tracking-[0.15em] uppercase select-none">
        speed — {formatSpeed(speed)}×
      </span>
    </motion.div>
  );
};
