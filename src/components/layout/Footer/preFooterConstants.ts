import art1 from '@/assets/manifesto/manifesto-art-1.webp';
import art2 from '@/assets/manifesto/manifesto-art-2.webp';
import art3 from '@/assets/manifesto/manifesto-art-3.webp';
import art4 from '@/assets/manifesto/manifesto-art-4.webp';
import art5 from '@/assets/manifesto/manifesto-art-5.webp';

/**
 * Base class for manifesto text lines.
 * z-10 keeps text above background images (z-0) but below foreground images (z-20).
 */
export const LINE_BASE = 'relative z-10';

/** Base class shared by all floating artwork images */
const IMG_BASE = 'absolute pointer-events-none';

/**
 * Floating artwork images with 3-tier responsive positioning.
 *
 * All positions are in px, relative to the inner text container (position: relative).
 * Container widths per breakpoint:
 *   base (<768px)  → max-w-[350px]
 *   md   (≥768px)  → max-w-[680px]
 *   lg   (≥1024px) → max-w-[1050px]
 */
export const MANIFESTO_IMAGES = [
  {
    src: art1,
    alt: 'Art 1',
    className: `${IMG_BASE} z-0
      w-[65px] top-[10px] left-[155px]
      md:w-[70px] md:top-[10px] md:left-[220px]
      lg:w-auto lg:top-[30px] lg:left-[280px]`,
  },
  {
    src: art2,
    alt: 'Art 2',
    className: `${IMG_BASE} z-0
      w-[55px] top-[-5px] right-[-5px]
      md:w-[55px] md:top-[0px] md:right-[40px]
      lg:w-auto lg:top-[80px] lg:right-[180px]`,
  },
  {
    src: art3,
    alt: 'Art 3',
    className: `${IMG_BASE} z-20
      w-[30px] top-[85px] left-[105px]
      md:w-[35px] md:top-[70px] md:left-[210px]
      lg:w-auto lg:top-[115px] lg:left-[440px]`,
  },
  {
    src: art4,
    alt: 'Art 4',
    className: `${IMG_BASE} z-20
      w-[50px] bottom-[5px] left-[20px]
      md:w-[60px] md:bottom-[-5px] md:left-[70px]
      lg:w-auto lg:bottom-[-25px] lg:left-[135px]`,
  },
  {
    src: art5,
    alt: 'Art 5',
    className: `${IMG_BASE} z-0
      w-[70px] bottom-[0px] right-[30px]
      md:w-[90px] md:bottom-[-10px] md:right-[80px]
      lg:w-auto lg:bottom-[-50px] lg:right-[260px]`,
  },
];
