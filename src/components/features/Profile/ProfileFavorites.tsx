import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import { useFavoritesStore } from '@/store/useFavoritesStore';

import type { UserDetail } from '@/types/user';

import { Loader } from '@/components/ui/Loader';
import { ArtworkGrid } from '@/components/features/Artworks/ArtworkGrid';

export const ProfileFavorites = () => {
  const { user } = useOutletContext<{ user: UserDetail | null }>();

  const favorites = useFavoritesStore((state) => state.favorites);
  const isLoading = useFavoritesStore((state) => state.isLoading);
  const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites);

  const artworks = favorites.map((item) => item.artwork);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  if (!user) return null;

  let content;

  if (isLoading) {
    content = (
      <div className="min-h-[100px] flex justify-center items-center">
        <Loader text="Loading favorites..." compact />
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
    content = <ArtworkGrid artworks={artworks} />;
  }

  return (
    <section id="profile-favorites">
      <div
        className={`
          border border-primary p-[16px_8px]
          md:p-[24px]
          lg:border-none lg:p-0
        `}
      >
        {content}
      </div>
    </section>
  );
};
