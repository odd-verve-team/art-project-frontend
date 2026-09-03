import { motion } from 'framer-motion';

const CORNER_DELAY = 0;
const TEXT_DELAY = 0.25;
const ENTRANCE_DURATION = 0.5;

export const HeroLogo = () => {
  const layoutVars = {
    '--offset-x': '117px',
    '--offset-y': '68px',
    '--text-offset-y': '24px',
    '--text-offset-x': '24px',
    '--corner-size': '50px',
    '--border-width': '2px',
  } as React.CSSProperties;

  const textBaseClasses =
    'absolute text-background font-light text-[36px] leading-none uppercase';

  const springTransition = {
    type: 'spring',
    stiffness: 80,
    damping: 16,
    mass: 1.1,
  } as const;

  const entrance = (delay: number) => ({
    opacity: 1,
    transition: {
      duration: ENTRANCE_DURATION,
      ease: 'easeOut' as const,
      delay,
    },
  });

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none"
      style={layoutVars}
    >
      {/* ==================== CORNERS ==================== */}
      <motion.span
        layoutId="logo-corner-tl"
        transition={springTransition}
        initial={{ opacity: 0 }}
        animate={entrance(CORNER_DELAY)}
        className="absolute top-0 left-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-t-[length:var(--border-width)] border-l-[length:var(--border-width)]"
      />
      <motion.span
        layoutId="logo-corner-tr"
        transition={springTransition}
        initial={{ opacity: 0 }}
        animate={entrance(CORNER_DELAY + 0.05)}
        className="absolute top-0 right-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-t-[length:var(--border-width)] border-r-[length:var(--border-width)]"
      />
      <motion.span
        layoutId="logo-corner-bl"
        transition={springTransition}
        initial={{ opacity: 0 }}
        animate={entrance(CORNER_DELAY + 0.1)}
        className="absolute bottom-[var(--offset-y)] left-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-b-[length:var(--border-width)] border-l-[length:var(--border-width)]"
      />
      <motion.span
        layoutId="logo-corner-br"
        transition={springTransition}
        initial={{ opacity: 0 }}
        animate={entrance(CORNER_DELAY + 0.15)}
        className="absolute bottom-[var(--offset-y)] right-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-b-[length:var(--border-width)] border-r-[length:var(--border-width)]"
      />

      {/* ==================== TEXT ==================== */}
      <motion.span
        layoutId="logo-text-odd"
        transition={springTransition}
        initial={{ opacity: 0 }}
        animate={entrance(TEXT_DELAY)}
        className={`${textBaseClasses} top-[var(--text-offset-y)] left-[calc(var(--offset-x)+var(--text-offset-x))]`}
      >
        ODD
      </motion.span>
      <motion.span
        layoutId="logo-text-verve"
        transition={springTransition}
        initial={{ opacity: 0 }}
        animate={entrance(TEXT_DELAY + 0.05)}
        className={`${textBaseClasses} top-[var(--text-offset-y)] right-[calc(var(--offset-x)+var(--text-offset-x))]`}
      >
        VERVE
      </motion.span>
      <motion.span
        layoutId="logo-text-art"
        transition={springTransition}
        initial={{ opacity: 0 }}
        animate={entrance(TEXT_DELAY + 0.1)}
        className={`${textBaseClasses} bottom-[calc(var(--offset-y)+var(--text-offset-y))] left-[calc(var(--offset-x)+var(--text-offset-x))]`}
      >
        ART
      </motion.span>
      <motion.span
        layoutId="logo-text-gallery"
        transition={springTransition}
        initial={{ opacity: 0 }}
        animate={entrance(TEXT_DELAY + 0.15)}
        className={`${textBaseClasses} bottom-[calc(var(--offset-y)+var(--text-offset-y))] right-[calc(var(--offset-x)+var(--text-offset-x))]`}
      >
        GALLERY
      </motion.span>
    </div>
  );
};
