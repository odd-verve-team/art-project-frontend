import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

const CORNER_DELAY = 0;
const TEXT_DELAY = 0.25;
const ENTRANCE_DURATION = 0.5;

// 💡 Усі xl замінені на md
const TEXT_BASE_CLASSES = `
  absolute text-background font-light leading-none uppercase text-[24px]
  md:text-[36px]
`;

const CORNER_BASE_CLASSES = `
  absolute border-background w-[24px] h-[24px]
  md:w-[50px] md:h-[50px]
`;

export const HeroLogo = () => {
  const [isFirstVisit] = useState(() => !useAppStore.getState().heroAnimated);

  useEffect(() => {
    if (isFirstVisit) {
      useAppStore.getState().setHeroAnimated(true);
    }
  }, [isFirstVisit]);

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
    <div className="absolute inset-0 pointer-events-none select-none flex justify-center z-10">
      <div className="relative w-full h-full max-w-[1440px]">
        <div
          className={`
            absolute
            -top-[44px] bottom-[24px] left-[16px] right-[16px]
            md:top-[68px] md:bottom-[68px] md:left-[117px] md:right-[117px]
          `}
        >
          {/* ==================== CORNERS ==================== */}
          <motion.span
            layoutId="logo-corner-tl"
            transition={springTransition}
            {...(isFirstVisit && {
              initial: { opacity: 0 },
              animate: entrance(CORNER_DELAY),
            })}
            className={`
              ${CORNER_BASE_CLASSES}
              top-0 left-0 border-t-[1px] border-l-[1px] 
              md:border-t-[2px] md:border-l-[2px]
            `}
          />
          <motion.span
            layoutId="logo-corner-tr"
            transition={springTransition}
            {...(isFirstVisit && {
              initial: { opacity: 0 },
              animate: entrance(CORNER_DELAY + 0.05),
            })}
            className={`
              ${CORNER_BASE_CLASSES}
              top-0 right-0 border-t-[1px] border-r-[1px] 
              md:border-t-[2px] md:border-r-[2px]
            `}
          />
          <motion.span
            layoutId="logo-corner-bl"
            transition={springTransition}
            {...(isFirstVisit && {
              initial: { opacity: 0 },
              animate: entrance(CORNER_DELAY + 0.1),
            })}
            className={`
              ${CORNER_BASE_CLASSES}
              bottom-0 left-0 border-b-[1px] border-l-[1px] 
              md:border-b-[2px] md:border-l-[2px]
            `}
          />
          <motion.span
            layoutId="logo-corner-br"
            transition={springTransition}
            {...(isFirstVisit && {
              initial: { opacity: 0 },
              animate: entrance(CORNER_DELAY + 0.15),
            })}
            className={`
              ${CORNER_BASE_CLASSES}
              bottom-0 right-0 border-b-[1px] border-r-[1px] 
              md:border-b-[2px] md:border-r-[2px]
            `}
          />

          {/* ==================== TEXT ==================== */}
          <motion.span
            layoutId="logo-text-odd"
            transition={springTransition}
            {...(isFirstVisit && {
              initial: { opacity: 0 },
              animate: entrance(TEXT_DELAY),
            })}
            className={`
              ${TEXT_BASE_CLASSES}
              top-[8px] left-[12px]
              md:top-[24px] md:left-[24px]
            `}
          >
            ODD
          </motion.span>
          <motion.span
            layoutId="logo-text-verve"
            transition={springTransition}
            {...(isFirstVisit && {
              initial: { opacity: 0 },
              animate: entrance(TEXT_DELAY + 0.05),
            })}
            className={`
              ${TEXT_BASE_CLASSES}
              top-[8px] right-[12px]
              md:top-[24px] md:right-[24px]
            `}
          >
            VERVE
          </motion.span>
          <motion.span
            layoutId="logo-text-art"
            transition={springTransition}
            {...(isFirstVisit && {
              initial: { opacity: 0 },
              animate: entrance(TEXT_DELAY + 0.1),
            })}
            className={`
              ${TEXT_BASE_CLASSES}
              bottom-[8px] left-[12px]
              md:bottom-[24px] md:left-[24px]
            `}
          >
            ART
          </motion.span>
          <motion.span
            layoutId="logo-text-gallery"
            transition={springTransition}
            {...(isFirstVisit && {
              initial: { opacity: 0 },
              animate: entrance(TEXT_DELAY + 0.15),
            })}
            className={`
              ${TEXT_BASE_CLASSES}
              bottom-[8px] right-[12px]
              md:bottom-[24px] md:right-[24px]
            `}
          >
            GALLERY
          </motion.span>
        </div>
      </div>
    </div>
  );
};
