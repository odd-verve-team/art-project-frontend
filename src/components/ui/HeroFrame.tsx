import { motion } from 'framer-motion';

const CORNERS_DELAY = 0.8;
const TEXT_DROP_DELAY = 1.1;

export const HeroFrame = () => {
  const frameVars = {
    '--offset-x': '405px',
    '--offset-y': '205px',
    '--corner-size': '25px',
    '--border-width': '2px',
  } as React.CSSProperties;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none select-none"
      style={frameVars}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: CORNERS_DELAY, duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute top-[var(--offset-y)] left-1/2 -translate-x-1/2 text-background text-[22px] font-light leading-none uppercase select-none"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: TEXT_DROP_DELAY, duration: 0.6, ease: 'easeOut' }}
      >
        Design 2026
      </motion.div>

      <span className="absolute top-[var(--offset-y)] left-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-t-[length:var(--border-width)] border-l-[length:var(--border-width)]" />
      <span className="absolute top-[var(--offset-y)] right-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-t-[length:var(--border-width)] border-r-[length:var(--border-width)]" />
      <span className="absolute bottom-[var(--offset-y)] left-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-b-[length:var(--border-width)] border-l-[length:var(--border-width)]" />
      <span className="absolute bottom-[var(--offset-y)] right-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-b-[length:var(--border-width)] border-r-[length:var(--border-width)]" />
    </motion.div>
  );
};
