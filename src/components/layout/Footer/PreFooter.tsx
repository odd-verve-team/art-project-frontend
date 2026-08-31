import art1 from '@/assets/manifesto/manifesto-art-1.png';
import art2 from '@/assets/manifesto/manifesto-art-2.png';
import art3 from '@/assets/manifesto/manifesto-art-3.png';
import art4 from '@/assets/manifesto/manifesto-art-4.png';
import art5 from '@/assets/manifesto/manifesto-art-5.png';

export const PreFooter = () => {
  return (
    <div
      className={`
        relative w-full flex justify-center overflow-hidden 
        bg-primary pt-[172px] pb-[88px]
      `}
    >
      <div
        className={`
          flex flex-col gap-[10px] w-full max-w-[1050px] mb-[55px]
          text-[56px]/[100%] font-[300] text-background uppercase whitespace-nowrap
        `}
      >
        <span className="relative z-10 self-start">the purpose of art</span>
        <span className="relative z-10 self-center ml-[3%]">
          is to challenge the ordinary,
        </span>
        <span className="relative z-10 self-center ml-[3%]">
          expand emotion,
        </span>
        <span className="relative z-10 self-center ml-[3%]">
          and make the impossible visible
        </span>

        <img
          src={art1}
          alt="Art 1"
          className={`
            absolute z-0 pointer-events-none
            top-[36%] left-[33%]
          `}
        />
        <img
          src={art2}
          alt="Art 2"
          className={`
            absolute z-0 pointer-events-none
            top-[45%] right-[26%]
          `}
        />
        <img
          src={art3}
          alt="Art 3"
          className={`
            absolute z-20 pointer-events-none
            top-[50.5%] left-[45.5%]
          `}
        />
        <img
          src={art4}
          alt="Art 4"
          className={`
            absolute z-20 pointer-events-none
            bottom-[20.5%] left-[23%]
          `}
        />
        <img
          src={art5}
          alt="Art 5"
          className={`
            absolute z-0 pointer-events-none
            bottom-[16%] right-[31.5%]
          `}
        />
      </div>
    </div>
  );
};
