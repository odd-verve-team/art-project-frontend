import type { Artwork } from "@/types/artwork";
import { useState } from "react";

export const ArtworkCard = ({ artwork }: { artwork: Artwork }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const size = `${artwork.image_width} / ${artwork.image_height}`;

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
        className="
          absolute inset-0
          bg-gradient-to-t from-primary/70 via-primary/60 to-primary/50
          opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out
        "
      ></div>
    </div>
  );
}
