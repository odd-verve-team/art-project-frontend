import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { artistsApi } from '@/services/api';
import { getFullName } from '@/utils/getFullName';

import type { ArtistDetail } from '@/types/artist';

import { ArtistPortrait } from '@/components/features/ArtistProfile/ArtistPortrait';
import { ArtistContactInfo } from '@/components/features/ArtistProfile/ArtistContactInfo';
import { ArtistBio } from '@/components/features/ArtistProfile/ArtistBio';
import { ArtistStyle } from '@/components/features/ArtistProfile/ArtistStyle';
import { ArtistStatement } from '@/components/features/ArtistProfile/ArtistStatement';
import { ArtistArtworks } from '@/components/features/ArtistProfile/ArtistArtworks';
import { BackButton } from '@/components/ui/BackButton';
import { Loader } from '@/components/ui/Loader';

export const ArtistProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  
  const [artist, setArtist] = useState<ArtistDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const artistId = Number(id);
  const isValidId = Boolean(id) && !Number.isNaN(artistId) && artistId > 0;

  useEffect(() => {
    if (!isValidId) return;

    let isCancelled = false;

    const fetchArtistProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await artistsApi.getArtistById(artistId);
        if (!isCancelled) {
          setArtist(response);
        }
      } catch {
        if (!isCancelled) {
          setArtist(null);
          setError('Failed to load artist profile');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchArtistProfile();

    return () => {
      isCancelled = true;
    };
  }, [artistId, isValidId]);

  if (!isValidId) {
    return (
      <div className="px-global min-h-[calc(100svh-var(--header-height))] flex flex-col items-center justify-center text-center gap-[24px]">
        <p className="text-[20px] md:text-[28px] font-[200] uppercase tracking-[1px] text-primary">
          Invalid artist ID
        </p>
        <BackButton className="w-[36px] h-[36px] p-[8px] md:w-[48px] md:h-[48px] md:p-[12px]" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="px-global min-h-[calc(100svh-var(--header-height))] flex flex-col items-center justify-center">
        <Loader text='Loading artist profile...'/>
      </div>
    )
  }

  if (error || !artist) {
    return (
      <div className="px-global min-h-[calc(100svh-var(--header-height))] flex flex-col items-center justify-center text-center gap-[24px]">
        <p className="text-[20px] md:text-[28px] font-[200] uppercase tracking-[1px] text-primary">
          {error || 'Artist not found'}
        </p>
        <BackButton className="w-[36px] h-[36px] p-[8px] md:w-[48px] md:h-[48px] md:p-[12px]" />
      </div>
    );
  }

  const fullName = getFullName(artist.first_name, artist.last_name);

  return (
    <div
      className={`
        relative px-global min-h-[calc(100svh-var(--header-height))]
      `}
    >
      <div
        className={`
          border-b-[1px] border-primary -mx-global px-global
          mt-[65px] mb-[0px]
          lg:mt-[80px] lg:mb-[0px]
        `}
      >
        <div className="relative w-full max-w-[1440px] mx-auto">
          <BackButton
            className={`
              hidden md:flex absolute
              left-0 w-[16px] h-[16px] -top-[24px]
              lg:w-[24px] lg:h-[24px] lg:-top-[32px]
            `}
          />
          <h2
            className={`
              font-[500] text-[52px] text-center uppercase
              lg:text-[min(6.25vw,90px)] lg:leading-[min(6.94vw,100px)]
            `}
          >
            {fullName}
          </h2>
        </div>
      </div>

      <div
        className={`
          flex flex-col
          lg:grid lg:grid-cols-[2fr_1fr] lg:max-w-[1440px] lg:mx-auto
          lg:border-x lg:border-b lg:border-primary lg:mb-[48px]
        `}
      >
        <div
          className={`
            contents
            lg:flex lg:flex-col
          `}
        >
          <ArtistPortrait
            artist={artist}
            className={`
              order-1 h-[420px]
              lg:order-none lg:h-[min(52.08vw,750px)]
            `}
          />

          <ArtistArtworks
            artworks={artist.artworks}
            variant="desktop-left"
          />
        </div>

        <ArtistArtworks
          artworks={artist.artworks}
          variant="mobile"
          className="order-4"
        />

        <div
          className={`
            contents
            lg:flex lg:flex-col
          `}
        >
          <div
            className={`
              contents
              lg:flex lg:flex-col lg:border-l lg:border-primary lg:-ml-[1px]
            `}
          >
            <ArtistBio
              artist={artist}
              className="order-3 lg:order-none"
            />
            <ArtistContactInfo
              artist={artist}
              className="order-2 lg:order-none"
            />
            <ArtistStyle
              artist={artist}
              className="order-5 lg:order-none"
            />
            <ArtistStatement
              artist={artist}
              className="order-6 lg:order-none"
            />
          </div>

          <ArtistArtworks
            artworks={artist.artworks}
            variant="desktop-right"
          />
        </div>

        <div
          aria-hidden="true"
          className={`
            order-7 h-[24px] border-x border-primary
            md:h-[32px]
            lg:hidden
          `}
        />
      </div>
    </div>
  );
};
