import { MANIFESTO_IMAGES, LINE_BASE } from './preFooterConstants';

export const PreFooter = () => {
  return (
    <div
      className={`
        w-full flex justify-center overflow-hidden bg-primary
        pt-[80px] pb-[50px]
        md:pt-[120px] md:pb-[70px]
        lg:pt-[172px] lg:pb-[88px]
      `}
    >
      <div
        className={`
          relative flex flex-col w-full
          font-[300] text-background uppercase
          gap-[14px] max-w-[350px] mb-[30px] text-[24px]/[100%]
          md:gap-[8px] md:max-w-[680px] md:mb-[40px] md:text-[28px]/[100%]
          lg:gap-[10px] lg:max-w-[1050px] lg:mb-[55px] lg:text-[56px]/[100%]
          md:whitespace-nowrap
        `}
      >
        <span className={`${LINE_BASE} self-start`}>
          the purpose of art
        </span>
        <span className={`${LINE_BASE} self-start ml-[18%] md:self-center md:ml-[3%]`}>
          is to challenge the ordinary,
        </span>
        <span className={`${LINE_BASE} self-start ml-[10%] md:self-center md:ml-[3%]`}>
          expand emotion,
        </span>
        <span className={`${LINE_BASE} self-start ml-[5%] md:self-center md:ml-[3%]`}>
          and make the impossible visible
        </span>

        {MANIFESTO_IMAGES.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className={img.className}
          />
        ))}
      </div>
    </div>
  );
};
