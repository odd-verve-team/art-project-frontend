export const AboutSection = () => {
  const paragraphClasses = `
    font-[300] text-justify
    text-[18px] leading-[24px]
    md:text-[20px] md:leading-[28px]
    xl:text-[24px] xl:leading-[32px]
  `;

  return (
    <section
      id="about"
      className={`
        grid items-start
        grid-cols-1 gap-y-[40px] pt-[50px]
        md:grid-cols-2 md:gap-x-[24px] md:pt-[100px]
        xl:grid-cols-3 xl:gap-y-0 xl:pt-[147px]
      `}
    >
      <div className="uppercase flex select-none md:col-span-2 xl:col-span-1 xl:max-w-[365px]">
        <p
          className={`
            font-[900]
            text-[60px] leading-[60px]
            xl:text-[100px] xl:leading-[70px] xl:mt-[10px]
          `}
        >
          odd
        </p>
        <p
          className={`
            font-[700]
            text-[24px] leading-[32px]
            xl:text-[36px] xl:leading-normal xl:mt-[-5px] xl:ml-[-5px]
          `}
        >
          verve
        </p>
      </div>

      <div className={paragraphClasses}>
        ODD verve is a digital-first contemporary gallery and platform operating
        at the intersection of high fine art, algorithmic experimentation, and
        tactile raw minimalism.
      </div>

      <div className={paragraphClasses}>
        Founded as a response to conventional exhibition spaces, Odd Verve
        curates, documents, and archives boundary-pushing visual works. From
        generative code topographies to heavy monochrome physical textures, our
        platform serves as a bridge between emerging creative pioneers and
        modern collectors.
      </div>
    </section>
  );
};
