import type { Artwork } from "@/types/artwork";
import { ArtworkCard } from "./ArtworkCard";

export const ArtworkGrid = ({ artworks }: { artworks: Artwork[] }) => {
  return (
    <div className="columns-3 gap-[24px]">
      {artworks.map(art => (
        <div
          key={art.id}
          className="break-inside-avoid mb-[24px]"
        >
          <ArtworkCard artwork={art}/>
        </div>
      ))}
    </div>
  )
}