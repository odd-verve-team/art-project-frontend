import { useArtworkStore } from '@/store/useArtworkStore';
import { useEffect } from 'react';
import { ArtworkGrid } from './ArtworkGrid';
import { Link } from 'react-router-dom';

export const FeaturedArtworks = () => {
  const featuredArtworks = useArtworkStore((state) => state.featuredArtworks);
  const fetchFeaturedArtworks = useArtworkStore(
    (state) => state.fetchFeaturedArtworks,
  );

  useEffect(() => {
    fetchFeaturedArtworks();
  }, [fetchFeaturedArtworks]);

  return (
    <section
      className={`
        mt-[50px] 
        md:mt-[100px]
      `}
    >
      <div
        className={`
          border-[1px] border-primary 
          px-[8px] py-[16px]
          md:p-[32px]
        `}
      >
        <ArtworkGrid artworks={featuredArtworks} />
      </div>

      <div
        className={`
          flex justify-center 
          mb-[50px] mt-[24px]
          md:mt-[50px]
        `}
      >
        <Link
          to="/gallery"
          className={`
            border-[1px] border-primary font-[300] uppercase whitespace-nowrap
            hover:bg-primary hover:text-background transition-colors duration-500 ease-in-out
            text-[16px] px-[24px] py-[12px]
            md:text-[18px] md:px-[32px] md:py-[16px]
            xl:text-[24px] xl:px-[44px] xl:py-[22px]
          `}
        >
          go to gallery
        </Link>
      </div>
    </section>
  );
};
