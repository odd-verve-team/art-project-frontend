import { useEffect, useMemo, useState } from 'react';

import type { Artwork } from '@/types/artwork';
import { ArtworkCard } from './ArtworkCard';

const getColumnsCount = () => {
  return window.innerWidth >= 1024 ? 3 : 2;
};

export const ArtworkGrid = ({ artworks }: { artworks: Artwork[] }) => {
  const [columnsCount, setColumnsCount] = useState<number>(getColumnsCount);

  useEffect(() => {
    const handleResize = () => {
      const newCount = getColumnsCount();
      if (newCount !== columnsCount) {
        setColumnsCount(newCount);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columnsCount]);

  const columns: Artwork[][] = useMemo(() => {
    if (!Array.isArray(artworks)) return [];

    const columnWrappers: Artwork[][] = Array.from(
      { length: columnsCount },
      () => [],
    );
    const columnHeights: number[] = new Array(columnsCount).fill(0);

    artworks.forEach((art) => {
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
      className={`
        grid 
        gap-[8px] 
        md:gap-[16px] 
        lg:gap-[24px]
      `}
      style={{
        gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
      }}
    >
      {columns.map((column, index) => (
        <div
          key={index}
          className={`
            flex 
            flex-col 
            gap-[8px] 
            md:gap-[16px] 
            lg:gap-[24px]
          `}
        >
          {column.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      ))}
    </div>
  );
};
