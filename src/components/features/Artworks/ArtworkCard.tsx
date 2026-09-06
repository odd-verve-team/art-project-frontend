import { useState } from "react";

import type { Artwork } from "@/types/artwork";
import HeartIcon from "@/assets/heart-icon.svg";

export const ArtworkCard = ({ artwork }: { artwork: Artwork }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const size = `${artwork.image_width} / ${artwork.image_height}`;
  const authorName = `${artwork.artist.first_name} ${artwork.artist.last_name}`;

  return (
    <div
      style={{ aspectRatio: size }}
      className="relative group overflow-hidden cursor-pointer"
    >
      <img
        src={artwork.image_url}
        alt={artwork.title}
        onLoad={() => setIsLoaded(true)}
        className={`
          absolute inset-0 w-full h-full object-cover
          p-[24px] border-[1px] border-primary
          transition-opacity duration-700 ease-in-out
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />

      <div
        className={`
          absolute inset-0
          bg-gradient-to-t from-primary/60 via-primary/50 to-primary/40
          opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out
          flex flex-col justify-end p-[24px] pointer-events-none
        `}
      >
        <div className="w-full flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-[8px] bg-white p-[8px]">
            <img
              src={artwork.artist.avatar_url}
              alt="Artist avatar"
              className="w-[24px] h-[24px] rounded-full object-cover"
            />
            <span
              className={`
              text-primary text-[12px] font-[700]
              leading-none tracking-wide uppercase`}
            >
              {authorName}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="p-[5px] cursor-pointer hover:scale-120 duration-300 ease-in-out"
          >
            <img src={HeartIcon} alt="Add to favourite" />
          </button>
        </div>
      </div>
    </div>
  );
}
