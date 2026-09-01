import { motion } from 'framer-motion';

export const HeroLogo = () => {
  const layoutVars = {
    '--offset-x': '117px', // Horizontal screen edge offset
    '--offset-y': '68px', // Bottom screen edge offset
    '--text-offset-y': '24px', // Vertical text offset from top
    '--text-offset-x': '24px', // Horizontal text gap from corners
    '--corner-size': '50px', // Corner dimensions (width & height)
    '--border-width': '2px', // Corner line thickness
  } as React.CSSProperties;

  const textBaseClasses =
    'absolute text-background font-light text-[36px] leading-none uppercase';

  const springTransition = {
    type: 'spring',
    stiffness: 80,
    damping: 16,
    mass: 1.1,
  } as const;

  return (
    <div className="absolute inset-0 pointer-events-none" style={layoutVars}>
      {/* ==================== CORNERS ==================== */}
      <motion.span
        layoutId="logo-corner-tl"
        transition={springTransition}
        className="absolute top-0 left-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-t-[length:var(--border-width)] border-l-[length:var(--border-width)]"
      />
      <motion.span
        layoutId="logo-corner-tr"
        transition={springTransition}
        className="absolute top-0 right-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-t-[length:var(--border-width)] border-r-[length:var(--border-width)]"
      />
      <motion.span
        layoutId="logo-corner-bl"
        transition={springTransition}
        className="absolute bottom-[var(--offset-y)] left-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-b-[length:var(--border-width)] border-l-[length:var(--border-width)]"
      />
      <motion.span
        layoutId="logo-corner-br"
        transition={springTransition}
        className="absolute bottom-[var(--offset-y)] right-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-b-[length:var(--border-width)] border-r-[length:var(--border-width)]"
      />

      {/* ==================== TEXT ==================== */}
      <motion.span
        layoutId="logo-text-odd"
        transition={springTransition}
        className={`${textBaseClasses} top-[var(--text-offset-y)] left-[calc(var(--offset-x)+var(--text-offset-x))]`}
      >
        ODD
      </motion.span>
      <motion.span
        layoutId="logo-text-verve"
        transition={springTransition}
        className={`${textBaseClasses} top-[var(--text-offset-y)] right-[calc(var(--offset-x)+var(--text-offset-x))]`}
      >
        VERVE
      </motion.span>
      <motion.span
        layoutId="logo-text-art"
        transition={springTransition}
        className={`${textBaseClasses} bottom-[calc(var(--offset-y)+var(--text-offset-y))] left-[calc(var(--offset-x)+var(--text-offset-x))]`}
      >
        ART
      </motion.span>
      <motion.span
        layoutId="logo-text-gallery"
        transition={springTransition}
        className={`${textBaseClasses} bottom-[calc(var(--offset-y)+var(--text-offset-y))] right-[calc(var(--offset-x)+var(--text-offset-x))]`}
      >
        GALLERY
      </motion.span>
    </div>
  );
};
