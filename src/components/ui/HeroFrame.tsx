import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

const CORNERS_DELAY = 0.8;
const TEXT_DROP_DELAY = 1.1;

const CORNER_BASE = `absolute border-background w-[25px] h-[25px]`;

export const HeroFrame = () => {
  const [isFirstVisit] = useState(() => !useAppStore.getState().heroAnimated);

  return (
    <div className="absolute inset-0 pointer-events-none select-none flex justify-center z-10">
      <div className="relative w-full h-full max-w-[1440px]">
        <motion.div
          className={`
            absolute 
            top-[110px] bottom-[110px] left-[110px] right-[110px]
            md:top-[150px] md:bottom-[150px] md:left-[200px] md:right-[200px]
            lg:top-[205px] lg:bottom-[205px] lg:left-[300px] lg:right-[300px]
            xl:left-[405px] xl:right-[405px]
          `}
          initial={isFirstVisit ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={
            isFirstVisit
              ? { delay: CORNERS_DELAY, duration: 0.8, ease: 'easeOut' }
              : undefined
          }
        >
          <motion.div
            className={`
              absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap
              text-background font-light leading-none uppercase select-none 
              text-[16px]
              md:text-[22px]
            `}
            initial={isFirstVisit ? { y: -60, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            transition={
              isFirstVisit
                ? { delay: TEXT_DROP_DELAY, duration: 0.6, ease: 'easeOut' }
                : undefined
            }
          >
            Design 2026
          </motion.div>

          <span
            className={`${CORNER_BASE} border-t-[2px] border-l-[2px] top-0 left-0`}
          />
          <span
            className={`${CORNER_BASE} border-t-[2px] border-r-[2px] top-0 right-0`}
          />
          <span
            className={`${CORNER_BASE} border-b-[2px] border-l-[2px] bottom-0 left-0`}
          />
          <span
            className={`${CORNER_BASE} border-b-[2px] border-r-[2px] bottom-0 right-0`}
          />
        </motion.div>
      </div>
    </div>
  );
};
