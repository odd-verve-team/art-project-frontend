import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import type { HeaderTheme } from '../layout/Header/headerConstants';

const LOGO_VARS = {
  '--corner-size': '11px',
  '--border-width': '1px',
} as React.CSSProperties;

const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 80,
  damping: 20,
  mass: 1.2,
} as const;

export const Logo = ({ theme }: { theme: HeaderTheme }) => {
  const isLightMode = theme === 'light';

  const cornerBase = `
    absolute w-[var(--corner-size)] h-[var(--corner-size)]
    border-[length:var(--border-width)] border-transparent
    transition-colors duration-500
    ${isLightMode ? '!border-primary' : '!border-background'}
  `;

  return (
    <Link
      to="/"
      style={LOGO_VARS}
      className={`
        relative inline-flex items-center transition-colors duration-500
        ${isLightMode ? 'bg-background text-primary' : 'bg-primary text-background'}
      `}
    >
      {/* CORNERS */}
      <motion.span
        layoutId="logo-corner-tl"
        transition={SPRING_TRANSITION}
        className={`
          ${cornerBase}
          top-0 left-0 border-r-0 border-b-0
        `}
      />
      <motion.span
        layoutId="logo-corner-tr"
        transition={SPRING_TRANSITION}
        className={`
          ${cornerBase}
          top-0 right-0 border-l-0 border-b-0
        `}
      />
      <motion.span
        layoutId="logo-corner-bl"
        transition={SPRING_TRANSITION}
        className={`
          ${cornerBase}
          bottom-0 left-0 border-r-0 border-t-0
        `}
      />
      <motion.span
        layoutId="logo-corner-br"
        transition={SPRING_TRANSITION}
        className={`
          ${cornerBase}
          bottom-0 right-0 border-l-0 border-t-0
        `}
      />

      {/* MAIN TEXT */}
      <div className="flex items-start px-[16px] py-[14px] leading-none">
        <motion.span
          layoutId="logo-text-odd"
          transition={SPRING_TRANSITION}
          className="font-black text-[36px]"
        >
          ODD
        </motion.span>
        <motion.span
          layoutId="logo-text-verve"
          transition={SPRING_TRANSITION}
          className="font-bold text-[16px] mt-[3px]"
        >
          VERVE
        </motion.span>
      </div>

      {/* HIDDEN TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0">
        <motion.span
          layoutId="logo-text-art"
          transition={SPRING_TRANSITION}
          className="text-[10px]"
        >
          ART
        </motion.span>
        <motion.span
          layoutId="logo-text-gallery"
          transition={SPRING_TRANSITION}
          className="text-[10px] ml-1"
        >
          GALLERY
        </motion.span>
      </div>
    </Link>
  );
};
