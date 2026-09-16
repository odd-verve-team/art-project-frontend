import type { Artwork } from "@/types/artwork";

interface Props {
  artwork: Artwork,
  className?: string,
}

export const ArtworkDescription = ({ artwork, className = '' }: Props) => {
  const { category, description } = artwork;

  return (
    <div
      className={`-mx-global px-global border-b flex flex-col border-primary ${className}`}
    >
      <div
        className={`
          flex-1 border-x border-primary p-[12px]
          flex flex-col justify-center gap-[24px]
          text-primary text-[12px]/[24px] font-[400]
          tracking-[1px] uppercase text-justify break-words
      `}
      >
        <span>category: {category}</span>
        <span>description: {description}</span>
      </div>
    </div>
  );
}
