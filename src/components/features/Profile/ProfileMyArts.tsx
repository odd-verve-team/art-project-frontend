import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { artistsApi } from '@/services/api'; 
import { getFullName } from '@/utils/getFullName';

import { Loader } from '@/components/ui/Loader';
import { ProfileArtsGrid } from './ProfileArtsGrid';

import type { UserDetail, UserProfile } from '@/types/user';
import type { ArtistArtworkListItem } from '@/types/artwork';

export const ProfileMyArts = () => {
  const { user, profile } = useOutletContext<{
    user: UserDetail | null;
    profile: UserProfile;
  }>();

  const [artworks, setArtworks] = useState<ArtistArtworkListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    let isCancelled = false;

    const fetchArtistArtworks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await artistsApi.getArtworks();
        if (!isCancelled) {
          setArtworks(data);
        }
      } catch (err) {
        if (!isCancelled) {
          const message =
            err instanceof Error ? err.message : 'Failed to load artworks';
          setError(message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchArtistArtworks();

    return () => {
      isCancelled = true;
    };
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
        <Loader text="Loading artworks..." />
      ) : error ? (
        <div className="border border-primary p-[24px] text-center lg:border-none">
          <p className="text-red-500 text-[12px] uppercase font-[500] tracking-[1px]">
            {error}
          </p>
        </div>
      ) : artworks.length > 0 ? (
        <ProfileArtsGrid
          artworks={artworks}
          artistName={getFullName(
            profile.first_name,
            profile.last_name,
            'User Name',
          )}
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
