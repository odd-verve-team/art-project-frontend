import { ArtistPortrait } from '@/components/features/ArtistProfile/ArtistPortrait';
import { ArtistContactInfo } from '@/components/features/ArtistProfile/ArtistContactInfo';
import { ArtistBio } from '@/components/features/ArtistProfile/ArtistBio';
import { ArtistStyle } from '@/components/features/ArtistProfile/ArtistStyle';
import { ArtistStatement } from '@/components/features/ArtistProfile/ArtistStatement';
import { ArtistArtworks } from '@/components/features/ArtistProfile/ArtistArtworks';
import { BackButton } from '@/components/ui/BackButton';

import { getFullName } from '@/utils/getFullName';
import { MOCK_ARTWORKS } from '@/mocks/data/artworksData';
import type { ArtistDetail } from '@/types/artist';
import type { Artwork } from '@/types/artwork';

import Slide03 from '@/assets/hero-slider/slide-03.webp';

export interface ArtistPageData extends Omit<ArtistDetail, 'artworks'> {
  email?: string;
  created_at?: string;
  art_categories?: string[];
  artworks: Artwork[];
}

const MOCK_ARTIST: ArtistPageData = {
  id: 10,
  first_name: 'Toy',
  last_name: 'Failor',
  bio: 'Toy Failor is a contemporary artist working across figurative painting and conceptual landscapes. His practice explores the tension between stillness and movement, memory and place, through carefully composed scenes that invite quiet reflection.',
  style:
    "Toy Failor's work sits between contemporary impressionism and figurative landscape. He uses oil on canvas to build layered atmospheres, blending expressive brushwork with subtle narrative elements.",
  statement:
    'My work is about the quiet moments we often overlook — a shadow on a hill, a figure in the distance, a tree that remembers more than we do. I paint to hold onto those moments.',
  image_url: Slide03,
  email: 'studio@toyfailor.com',
  created_at: '2026-12-23T12:00:00Z',
  art_categories: [
    'figurative',
    'landscape',
    'narrative',
    'contemporary impressionism',
  ],
  address: {
    country: 'Greece',
    city: 'Athens',
  },
  social_media: {
    instagram: 'https://www.instagram.com/nike/',
    twitter: 'https://x.com/Nike',
    telegram: 'https://t.me/nikeuzb',
    facebook: 'https://www.facebook.com/nike/?locale=pl_PL',
  },
  artworks: MOCK_ARTWORKS.slice(0, 9),
};

export const ArtistProfilePage = () => {
  const fullName = getFullName(MOCK_ARTIST.first_name, MOCK_ARTIST.last_name);

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
            artist={MOCK_ARTIST}
            className={`
              order-1 h-[420px]
              lg:order-none lg:h-[min(52.08vw,750px)]
            `}
          />

          <ArtistArtworks
            artworks={MOCK_ARTIST.artworks}
            variant="desktop-left"
          />
        </div>

        <ArtistArtworks
          artworks={MOCK_ARTIST.artworks}
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
              artist={MOCK_ARTIST}
              className="order-3 lg:order-none"
            />
            <ArtistContactInfo
              artist={MOCK_ARTIST}
              className="order-2 lg:order-none"
            />
            <ArtistStyle
              artist={MOCK_ARTIST}
              className="order-5 lg:order-none"
            />
            <ArtistStatement
              artist={MOCK_ARTIST}
              className="order-6 lg:order-none"
            />
          </div>

          <ArtistArtworks
            artworks={MOCK_ARTIST.artworks}
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
