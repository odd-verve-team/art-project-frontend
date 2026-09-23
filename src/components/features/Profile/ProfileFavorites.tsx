import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import type { UserDetail } from '@/types/user';
import { useArtworkStore } from '@/store/useArtworkStore';
import { ArtworkGrid } from '../Artworks/ArtworkGrid';
import { Loader } from '@/components/ui/Loader';

export const ProfileFavorites = () => {
  const { user } = useOutletContext<{ user: UserDetail | null }>();

  const featuredArtworks = useArtworkStore((state) => state.featuredArtworks);
  const fetchArtworks = useArtworkStore((state) => state.fetchFeaturedArtworks);
  const isLoading = useArtworkStore((state) => state.isLoading);

  //! TODO: replace with user.favorites endpoint in future
  const favorites = featuredArtworks.slice(0, 5);

  useEffect(() => {
    if (featuredArtworks.length === 0) {
      fetchArtworks();
    }
  }, [featuredArtworks.length, fetchArtworks]);

  if (!user) return null;

  let content;

  if (isLoading) {
    content = (
      <div className="min-h-[100px] flex justify-center items-center">
        <Loader text="Loading..." compact />
      </div>
    );
  } else if (favorites.length === 0) {
    content = (
      <div className="min-h-[100px] flex items-center justify-center text-center p-[24px]">
        <p className="text-primary text-[12px] uppercase font-[500] tracking-[1px]">
          You haven't liked any artworks yet
        </p>
      </div>
    );
  } else {
    content = <ArtworkGrid artworks={favorites} />;
  }

  return (
    <section id="profile-favorites">
      <div className="border border-primary p-[16px_8px]">{content}</div>

      {/* 
        //! TODO: Uncomment when backend supports user.favorites 
        //! endpoint with pagination and total count
      */}
      {/* 
      {favorites.length > 0 && (
        <div className="flex justify-center mt-[24px]">
          <button
            type="button"
            className={`
              text-[12px]/[24px] font-[500] tracking-[1px] uppercase text-primary
              hover:opacity-70 transition-opacity duration-300 outline-none cursor-pointer
            `}
          >
            See more
          </button>
        </div>
      )} 
      */}
    </section>
  );
};
