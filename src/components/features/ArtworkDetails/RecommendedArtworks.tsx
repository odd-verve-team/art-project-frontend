import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { artworksApi } from '@/services/api';
import type { Artwork, ArtworkCategory } from '@/types/artwork';

import ArrowIcon from '@/assets/social-arrow-icon.svg';
import { Loader } from '@/components/ui/Loader';

interface Props {
  artworkId: number;
  artworkCategory: ArtworkCategory;
  className?: string;
}

export const RecommendedArtworks = ({
  artworkId,
  artworkCategory,
  className = '',
}: Props) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRecommended = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await artworksApi.getAll({
          category: artworkCategory,
          limit: 5,
        });

        if (isMounted) {
          const data = response.data
            .filter((art) => art.id !== artworkId)
            .slice(0, 4);
          setArtworks(data);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to fetch recommended artworks:', err);
          setError('Failed to load recommendations');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRecommended();

    return () => {
      isMounted = false;
    };
  }, [artworkCategory, artworkId]);

  const renderCard = (artwork: Artwork) => {
    const { title, image_url: image, id, created_at } = artwork;
    const date = created_at
      ? new Date(created_at).toLocaleDateString('en-GB')
      : 'xx/xx/xxxx';

    return (
      <div key={id} className="flex flex-col gap-[16px]">
        <div className="text-muted text-[16px] lg:text-[min(1.11vw,16px)] font-[300] text-right">
          {date}
        </div>

        <Link to={`/gallery/${id}`} className="flex flex-col gap-[16px] group">
          <div className="w-full aspect-[4/5] overflow-hidden">
            <img
              src={image}
              alt={title}
              className={`
                w-full h-full object-cover 
                transition-transform duration-500 ease-out 
                group-hover:scale-105
              `}
            />
          </div>

          <div className="flex justify-between items-start">
            <span
              className={`
                text-primary text-[16px]/[24px] lg:text-[min(1.11vw,16px)] lg:leading-[min(1.66vw,24px)] font-[500] 
                tracking-[1px] uppercase pr-[8px] 
                transition-colors duration-300 group-hover:text-primary/70
              `}
            >
              {title}
            </span>
            <img
              src={ArrowIcon}
              aria-hidden="true"
              className={`
                w-[10px] h-[10px] invert mt-[6px] mr-[5px] shrink-0 
                transition-all duration-300 group-hover:opacity-70 
                group-hover:translate-x-[2px] group-hover:-translate-y-[2px]
              `}
            />
          </div>
        </Link>
      </div>
    );
  };

  let content;

  if (isLoading) {
    content = (
      <div className="h-full flex justify-center pt-[26px] lg:items-center lg:pt-0">
        <Loader text="Loading..." compact />
      </div>
    );
  } else if (error) {
    content = (
      <div className="h-full flex items-center justify-center pt-[26px] lg:pt-0">
        <p className="text-primary text-[14px] uppercase font-[600] tracking-[1px]">
          {error}
        </p>
      </div>
    );
  } else if (artworks.length === 0) {
    content = (
      <div className="h-full flex items-center justify-center text-center py-[26px] lg:py-0">
        <p className="text-primary text-[14px] lg:text-[16px] uppercase font-[600] tracking-[1px]">
          No similar artworks found
        </p>
      </div>
    );
  } else {
    const mobileView = (
      <div 
        className={`
          grid grid-cols-2 gap-[16px] 
          max-w-[400px] mx-auto pt-[12px] pb-[38px]
        `}
      >
        {artworks.map(renderCard)}
      </div>
    );

    const desktopView = (
      <div className="relative h-full flex flex-col justify-center py-[24px] lg:py-[min(1.66vw,24px)]">
        {artworks.length > 2 && (
          <div
            className={`
              absolute top-0 bottom-0 left-[calc(50%-0.5px)]
              w-[1px] bg-primary pointer-events-none
            `}
          />
        )}

        <div
          className={`
            grid grid-cols-2 gap-y-[24px] px-[24px] lg:gap-y-[min(1.66vw,24px)] lg:px-[min(1.66vw,24px)]
            gap-x-[24px] lg:gap-x-[min(3.33vw,48px)]
          `}
        >
          {artworks.map(renderCard)}
        </div>
      </div>
    );

    content = (
      <>
        <div className="block lg:hidden">{mobileView}</div>
        <div className="hidden lg:block lg:h-full">{desktopView}</div>
      </>
    );
  }

  return (
    <section
      className={`
        border-primary -mx-global px-global
        lg:mx-0 lg:px-0
        ${className}
      `}
    >
      <div
        className={`
          h-full border-x border-primary
          lg:border-x-0
        `}
      >
        {content}
      </div>
    </section>
  );
};
