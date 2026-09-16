import { MANIFESTO_IMAGES, LINE_BASE } from './preFooterConstants';

export const PreFooter = () => {
  return (
    <div
      className={`
        w-full flex justify-center overflow-hidden bg-primary
        pt-[clamp(80px,12vw,172px)] pb-[clamp(50px,6vw,88px)]
      `}
    >
      <div
        className={`
          relative flex flex-col w-full
          font-[300] text-background uppercase
          gap-[14px] max-w-[clamp(300px,72vw,1050px)] mb-[clamp(30px,4vw,55px)] text-[clamp(20px,3.9vw,56px)]/[100%]
          md:gap-[10px] md:whitespace-nowrap
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
