import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import type { UserDetail } from '@/types/user';
import type { Artwork } from '@/types/artwork';
import { artworksApi } from '@/services/api';

import { ProfileArtsGrid } from './ProfileArtsGrid';

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

        setArtworks(response.data);
        console.log('user artworks:', response.data);
      } catch (error) {
        console.error('Failed to fetch user artworks', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserArtworks();

    //! TODO: implement AbortController or cleanup function to prevent race conditions later
  }, [user]);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-[16px]">
      <Link
        to="/profile/arts/new"
        className={`
          flex items-center justify-center w-full py-[12px]
          border border-primary text-primary
          text-[16px] font-[500] uppercase
          transition-all hover:opacity-70 hover:bg-gray-100 duration-300
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
        <div className="border border-primary p-[24px] text-center">
          <p className="text-primary text-[12px] uppercase font-[500] tracking-[1px]">
            You haven't uploaded any artworks yet.
          </p>
        </div>
      )}
    </div>
  );
};
