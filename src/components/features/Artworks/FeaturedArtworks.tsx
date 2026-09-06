import { useArtworkStore } from '@/store/useArtworkStore';
import { useEffect } from 'react';
import { ArtworkGrid } from './ArtworkGrid';
import { Link } from 'react-router-dom';

export const FeaturedArtworks = () => {
  const featuredArtworks = useArtworkStore((state) => state.featuredArtworks);
  const fetchFeaturedArtworks = useArtworkStore((state) => state.fetchFeaturedArtworks);

  useEffect(() => {
    fetchFeaturedArtworks();
  }, [fetchFeaturedArtworks]);

  return (
    <section className="mt-[100px]">
      <div className="p-[32px] border-[1px] border-primary">
        <ArtworkGrid artworks={featuredArtworks} />
      </div>
      <div className="my-[50px] flex justify-center">
        <Link
          to="/gallery"
          className={`
            border-[1px] border-primary px-[44px] py-[22px]
            text-[24px] font-[300] uppercase
            hover:bg-primary hover:text-background transition-colors duration-500 ease-in-out
          `}
        >
          go to gallery
        </Link>
      </div>
    </section>
  );
};
