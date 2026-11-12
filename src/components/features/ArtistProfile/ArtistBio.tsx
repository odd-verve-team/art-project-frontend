import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import type { ArtistPageData } from '@/pages/ArtistProfilePage';
import { cn } from '@/utils/cn';
import ArrowIcon from '@/assets/social-arrow-icon.svg';

interface Props {
  artist: ArtistPageData;
  className?: string;
}

export const ArtistBio = ({ artist, className = '' }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const { bio } = artist;

  const bioContent = (
    <p
      className={`
        pt-[12px] text-primary text-[12px]/[24px] font-[400]
        tracking-[1px] uppercase text-justify break-words
        lg:pt-[min(1.11vw,16px)]
        lg:text-[min(1.11vw,16px)] lg:leading-[min(1.66vw,24px)]
      `}
    >
      {bio}
    </p>
  );

  return (
    <section
      className={`
        border-b border-primary -mx-global px-global
        lg:mx-0 lg:px-0
        ${className}
      `}
    >
      <div
        className={`
          flex flex-col border-x border-primary p-[12px]
          lg:border-x-0 lg:p-[min(1.66vw,24px)]
        `}
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className={`
            flex items-center justify-between w-full text-left cursor-pointer
            lg:cursor-default lg:pointer-events-none
          `}
        >
          <span
            className={`
              text-muted text-[12px] font-[300] uppercase
              lg:text-[min(1.11vw,16px)]
            `}
          >
            about the artist
          </span>

          <img
            src={ArrowIcon}
            aria-hidden="true"
            className={cn(
              'w-[8px] h-[8px] invert opacity-50 transition-transform duration-300 ease-in-out lg:hidden',
              isOpen ? '-rotate-45' : 'rotate-[135deg]',
            )}
          />
        </button>

        <div className="block lg:hidden">
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="artist-bio-mobile"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                {bioContent}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden lg:block">{bioContent}</div>
      </div>
    </section>
  );
};
