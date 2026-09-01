import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Logo = () => {
  const logoVars = {
    '--corner-size': '11px',
    '--border-width': '1px',
  } as React.CSSProperties;

  const springTransition = {
    type: 'spring',
    stiffness: 80,
    damping: 20,
    mass: 1.2,
  } as const;

  return (
    <Link
      to="/"
      className="relative inline-flex items-center bg-primary"
      style={logoVars}
    >
      {/* CORNERS */}
      <motion.span
        layoutId="logo-corner-tl"
        transition={springTransition}
        className="absolute top-0 left-0 w-[var(--corner-size)] h-[var(--corner-size)] border-t-[length:var(--border-width)] border-l-[length:var(--border-width)] border-white"
      />
      <motion.span
        layoutId="logo-corner-tr"
        transition={springTransition}
        className="absolute top-0 right-0 w-[var(--corner-size)] h-[var(--corner-size)] border-t-[length:var(--border-width)] border-r-[length:var(--border-width)] border-white"
      />
      <motion.span
        layoutId="logo-corner-bl"
        transition={springTransition}
        className="absolute bottom-0 left-0 w-[var(--corner-size)] h-[var(--corner-size)] border-b-[length:var(--border-width)] border-l-[length:var(--border-width)] border-white"
      />
      <motion.span
        layoutId="logo-corner-br"
        transition={springTransition}
        className="absolute bottom-0 right-0 w-[var(--corner-size)] h-[var(--corner-size)] border-b-[length:var(--border-width)] border-r-[length:var(--border-width)] border-white"
      />

      {/* MAIN TEXT */}
      <div className="flex items-start px-[16px] py-[14px] leading-none">
        <motion.span
          layoutId="logo-text-odd"
          transition={springTransition}
          className="text-background font-black text-[36px]"
        >
          ODD
        </motion.span>
        <motion.span
          layoutId="logo-text-verve"
          transition={springTransition}
          className="text-background font-bold text-[16px] mt-[3px]"
        >
          VERVE
        </motion.span>
      </div>

      {/* HIDDEN TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.span
          layoutId="logo-text-art"
          transition={springTransition}
          className="text-background text-[10px]"
          style={{ opacity: 0 }}
        >
          ART
        </motion.span>
        <motion.span
          layoutId="logo-text-gallery"
          transition={springTransition}
          className="text-background text-[10px] ml-1"
          style={{ opacity: 0 }}
        >
          GALLERY
        </motion.span>
      </div>
    </Link>
  );
};
