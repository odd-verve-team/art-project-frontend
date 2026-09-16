import art1 from '@/assets/manifesto/manifesto-art-1.webp';
import art2 from '@/assets/manifesto/manifesto-art-2.webp';
import art3 from '@/assets/manifesto/manifesto-art-3.webp';
import art4 from '@/assets/manifesto/manifesto-art-4.webp';
import art5 from '@/assets/manifesto/manifesto-art-5.webp';

export const LINE_BASE = 'relative z-10';

const IMG_BASE = 'absolute pointer-events-none';

export const MANIFESTO_IMAGES = [
  {
    src: art1,
    alt: 'Art 1',
    className: `${IMG_BASE} z-0
      w-[clamp(55px,7vw,110px)]
      top-[8%] left-[44%]
      md:top-[clamp(5px,3%,30px)] md:left-[28%]`,
  },
  {
    src: art2,
    alt: 'Art 2',
    className: `${IMG_BASE} z-0
      w-[clamp(45px,5.5vw,90px)]
      top-[-2%] right-[-1%]
      md:top-[clamp(0px,5vw,80px)] md:right-[clamp(40px,12%,180px)]`,
  },
  {
    src: art3,
    alt: 'Art 3',
    className: `${IMG_BASE} z-20
      w-[clamp(25px,3.5vw,55px)]
      top-[50%] left-[30%]
      md:left-[40%]`,
  },
  {
    src: art4,
    alt: 'Art 4',
    className: `${IMG_BASE} z-20
      w-[clamp(40px,6.5vw,100px)]
      bottom-[3%] left-[6%]
      md:bottom-[clamp(-25px,-1.5vw,0px)] md:left-[10%]`,
  },
  {
    src: art5,
    alt: 'Art 5',
    className: `${IMG_BASE} z-0
      w-[clamp(55px,9vw,130px)]
      bottom-[0%] right-[9%]
      md:bottom-[clamp(-50px,-2.5vw,0px)] md:right-[24%]`,
  },
];
