import type { Artwork } from "@/types/artwork";
import { useState } from "react";

export const ArtworkCard = ({ artwork }: { artwork: Artwork }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const size = `${artwork.image_width} / ${artwork.image_height}`;

  return (
    <div
      style={{ aspectRatio: size }}
      className="relative overflow-hidden bg-background/50"
    >
      <img
        src={artwork.image_url}
        alt={artwork.title}
        onLoad={() => setIsLoaded(true)}
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-700 ease-in-out
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </div>
  );
}
