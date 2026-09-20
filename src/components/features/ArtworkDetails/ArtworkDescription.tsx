import type { Artwork } from "@/types/artwork";

interface Props {
  artwork: Artwork,
  className?: string,
}

export const ArtworkDescription = ({ artwork, className = '' }: Props) => {
  const { category, description } = artwork;

  return (
    <section
      className={`
        flex flex-col border-b border-primary -mx-global px-global
        lg:mx-0 lg:px-0
        ${className}
      `}
    >
      <div
        className={`
          flex flex-col flex-1 justify-center gap-[24px]
          border-x border-primary p-[12px]
          text-primary text-[12px]/[24px] font-[400] tracking-[1px]
          uppercase text-justify break-words
          lg:border-x-0 lg:p-[min(1.66vw,24px)] lg:text-[min(1.11vw,16px)] lg:leading-[min(1.66vw,24px)]
        `}
      >
        <span>category: {category}</span>
        <span>description: {description}</span>
      </div>
    </section>
  );
}
