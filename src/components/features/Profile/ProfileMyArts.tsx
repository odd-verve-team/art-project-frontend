import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import type { UserDetail } from '@/types/user';
import type { Artwork } from '@/types/artwork';
import { artworksApi } from '@/services/api';

import { ProfileArtsGrid } from './ProfileArtsGrid';
//! TODO: DELETE MOCKDATA import when backend is ready
import { MOCK_PROFILE_ARTWORKS } from './profileMockData';

export const ProfileMyArts = () => {
  const { user } = useOutletContext<{ user: UserDetail | null }>();

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;

    const fetchUserArtworks = async () => {
      setIsLoading(true);
      try {
        const response = await artworksApi.getAll({
          artist: user.id,
          status: 'pending,approved,sold,rejected',
        });

        setArtworks(
          response.data.length > 0 ? response.data : MOCK_PROFILE_ARTWORKS,
        );
      } catch (error) {
        console.warn('Failed to fetch user artworks, using MOCK_PROFILE_ARTWORKS:', error);
        //! TODO: DELETE MOCKDATA fallback when backend is ready
        setArtworks(MOCK_PROFILE_ARTWORKS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserArtworks();

    //! TODO: implement AbortController or cleanup function to prevent race conditions later
  }, [user]);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-[16px] md:gap-[20px] lg:gap-[24px]">
      <Link
        to="/profile/arts/new"
        className={`
          flex items-center justify-center w-full py-[12px]
          border border-primary text-primary
          text-[16px] font-[500] uppercase
          transition-all hover:opacity-70 hover:bg-gray-100 duration-300
          md:py-[14px] md:text-[18px]
          lg:py-[16px] lg:text-[20px]
        `}
      >
        + New Art
      </Link>

      {isLoading ? (
        <p>Loading...</p>
      ) : artworks.length > 0 ? (
        <ProfileArtsGrid
          artworks={artworks}
          artistName={`${user.first_name} ${user.last_name}`}
        />
      ) : (
        <div className="border border-primary p-[24px] text-center lg:border-none">
          <p className="text-primary text-[12px] uppercase font-[500] tracking-[1px]">
            You haven't uploaded any artworks yet.
          </p>
        </div>
      )}
    </div>
  );
};
