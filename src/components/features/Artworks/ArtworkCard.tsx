import { useState } from 'react';

import type { Artwork } from '@/types/artwork';
import HeartIcon from '@/assets/heart-icon.svg';
import { Link } from 'react-router-dom';

export const ArtworkCard = ({ artwork }: { artwork: Artwork }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const size = `${artwork.image_width} / ${artwork.image_height}`;
  const authorName = `${artwork.artist.first_name} ${artwork.artist.last_name}`;

  return (
    <Link
      to={`/gallery/${artwork.id}`}
      style={{ aspectRatio: size }}
      className="relative group overflow-hidden cursor-pointer"
    >
      <img
        src={artwork.image_url}
        alt={artwork.title}
        onLoad={() => setIsLoaded(true)}
        className={`
          absolute inset-0 w-full h-full object-cover border-[1px] border-primary transition-opacity duration-700 ease-in-out
          p-[8px]
          md:p-[16px]
          lg:p-[24px]
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />

      <div
        className={`
          absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/60 via-primary/50 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none
          p-[8px]
          md:p-[16px]
          lg:p-[24px]
        `}
      >
        <div className="w-full flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-[8px] bg-white p-[8px]">
            <img
              src={artwork.artist.avatar_url || undefined}
              alt="Artist avatar"
              className="w-[24px] h-[24px] rounded-full object-cover"
            />
            <span
              className={`
                text-primary text-[12px] font-[700] leading-none tracking-wide uppercase
              `}
            >
              {authorName}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="p-[5px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <img src={HeartIcon} alt="Add to favourite" />
          </button>
        </div>
      </div>
    </Link>
  );
};
