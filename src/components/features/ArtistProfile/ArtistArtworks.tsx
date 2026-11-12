import { useMemo } from 'react';

import { ArtworkCard } from '@/components/features/Artworks/ArtworkCard';
import { ArtworkGrid } from '@/components/features/Artworks/ArtworkGrid';
import type { Artwork } from '@/types/artwork';

interface Props {
  artworks: Artwork[];
  variant: 'mobile' | 'desktop-left' | 'desktop-right';
  className?: string;
}

export const ArtistArtworks = ({
  artworks,
  variant,
  className = '',
}: Props) => {
  const desktopColumns: Artwork[][] = useMemo(() => {
    if (!Array.isArray(artworks)) return [[], [], []];

    const columnWrappers: Artwork[][] = [[], [], []];
    const columnHeights: number[] = [0, 0, 1];

    artworks.forEach((art) => {
      const ratio = art.image_height / art.image_width;
      const minH = Math.min(...columnHeights);
      const index = columnHeights.indexOf(minH);

      columnWrappers[index].push(art);
      columnHeights[index] += ratio;
    });

    return columnWrappers;
  }, [artworks]);

  if (artworks.length === 0) {
    if (variant === 'desktop-right') return null;

    return (
      <section
        className={`
          border-b border-primary -mx-global px-global
          lg:mx-0 lg:px-0 lg:border-b-0
          ${className}
        `}
      >
        <div
          className={`
            flex items-center justify-center text-center
            border-x border-primary py-[48px] px-[12px]
            lg:border-x-0 lg:py-[min(5.55vw,80px)]
          `}
        >
          <p className="text-primary text-[14px] lg:text-[16px] uppercase font-[500] tracking-[1px]">
            No artworks uploaded yet
          </p>
        </div>
      </section>
    );
  }

  if (variant === 'mobile') {
    return (
      <section
        className={`
          border-b border-primary -mx-global px-global
          lg:hidden
          ${className}
        `}
      >
        <div
          className={`
            border-x border-primary px-[8px] py-[12px]
            md:p-[16px]
          `}
        >
          <ArtworkGrid artworks={artworks} />
        </div>
      </section>
    );
  }

  if (variant === 'desktop-left') {
    const leftTwoColumns = desktopColumns.slice(0, 2);

    return (
      <section
        className={`
          hidden lg:block
          lg:pt-[min(1.66vw,24px)] lg:pb-[min(3.33vw,48px)]
          lg:pl-[min(1.66vw,24px)] lg:pr-[min(0.83vw,12px)]
          ${className}
        `}
      >
        <div className="grid grid-cols-2 lg:gap-[min(1.66vw,24px)]">
          {leftTwoColumns.map((column, colIndex) => (
            <div
              key={colIndex}
              className="flex flex-col lg:gap-[min(1.66vw,24px)]"
            >
              {column.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  }

  const rightThirdColumn = desktopColumns[2];

  return (
    <section
      className={`
        hidden lg:block
        lg:pt-[min(1.66vw,24px)] lg:pb-[min(3.33vw,48px)]
        lg:pl-[min(0.83vw,12px)] lg:pr-[min(1.66vw,24px)]
        ${className}
      `}
    >
      <div className="flex flex-col lg:gap-[min(1.66vw,24px)]">
        {rightThirdColumn.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </section>
  );
};
