import type { Artwork } from '@/types/artwork';

import HeartIcon from '@/assets/heart-icon.svg';

interface Props {
  artwork: Artwork;
  className?: string;
}

export const ArtworkImage = ({ artwork, className = '' }: Props) => {
  const { title, image_url } = artwork;
  const date = artwork.created_at
    ? new Date(artwork.created_at).toLocaleDateString('en-GB')
    : 'xx/xx/xxxx';

  return (
    <section
      className={`-mx-global px-global border-b border-primary ${className}`}
    >
      <div className="relative h-full border-x border-primary flex items-center justify-center p-[45px]">
        <div
          className={`
            absolute top-0 left-0 w-full
            flex justify-between items-center p-[12px]
            text-primary/50 text-[12px] font-[300] uppercase
            pointer-events-none
          `}
        >
          <span>artwork</span>
          <span>{date}</span>
        </div>

        <img
          src={image_url}
          alt={title}
          className="max-w-full max-h-full object-contain"
        />

        <div className="absolute bottom-0 right-0 flex p-[10px]">
          <button type="button">
            <img
              src={HeartIcon}
              alt="Add to favorite"
              className="invert opacity-40 hover:opacity-100 transition-opacity"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
