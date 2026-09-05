import type { Artwork } from "@/types/artwork";
import { ArtworkCard } from "./ArtworkCard";
import { useMemo, useState } from "react";

export const ArtworkGrid = ({ artworks }: { artworks: Artwork[] }) => {
  // TODO: Add window resize listener to update columnsCount dynamically using setColumnsCount
  const [columnsCount] = useState<number>(3);

  const columns: Artwork[][] = useMemo(() => {
    const columnWrappers: Artwork[][] = Array.from({ length: columnsCount }, () => []);
    const columnHeights: number[] = new Array(columnsCount).fill(0);

    const sortedArtworks = [...artworks].sort((a, b) => {
      const ratioA = a.image_height / a.image_width;
      const ratioB = b.image_height / b.image_width;
      return ratioB - ratioA;
    })

    sortedArtworks.forEach((art) => {
      const ratio = art.image_height / art.image_width;

      const minH = Math.min(...columnHeights);
      const index = columnHeights.indexOf(minH);

      columnWrappers[index].push(art);
      columnHeights[index] += ratio;
    });

    return columnWrappers;
  }, [artworks, columnsCount]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
        gap: '24px',
      }}
    >
      {columns.map((column, index) => (
        <div key={index} className="flex flex-col gap-[24px]">
          {column.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork}/>
          ))}
        </div>
      ))}
    </div>
  );
}