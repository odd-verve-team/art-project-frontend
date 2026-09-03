export const AboutSection = () => {
  return (
    <section className="grid grid-cols-3 items-start gap-x-[24px] pt-[147px]">
      <div className="max-w-[365px] uppercase flex select-none">
        <p className="text-[100px]/[70px] font-[900] mt-[10px]">odd</p>
        <p className="text-[36px] font-[700] mt-[-5px] ml-[-5px]">
          verve
        </p>
      </div>
      <div className="text-[24px] font-[300] text-justify">
        ODD verve is a digital-first contemporary gallery and platform operating
        at the intersection of high fine art, algorithmic experimentation, and
        tactile raw minimalism.
      </div>
      <div className="text-[24px] font-[300] text-justify">
        Founded as a response to conventional exhibition spaces, Odd Verve
        curates, documents, and archives boundary-pushing visual works. From
        generative code topographies to heavy monochrome physical textures, our
        platform serves as a bridge between emerging creative pioneers and
        modern collectors.
      </div>
    </section>
  );
}