import { useState } from 'react';

import { ArtworkGrid } from '@/components/features/Artworks/ArtworkGrid';
import { SearchBar } from '@/components/features/Search/SearchBar';

import { MOCK_ARTWORKS } from '@/mocks/data/artworksData';

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const matchedArtworks = trimmedQuery
    ? MOCK_ARTWORKS.filter((art) =>
        art.title.toLowerCase().includes(trimmedQuery),
      ).slice(0, 4)
    : [];

  const displayedArtworks = trimmedQuery ? matchedArtworks : MOCK_ARTWORKS;

  return (
    <div>
      <div className="bg-primary text-background px-global">
        <div className="max-w-[1440px] mx-auto w-full">
          <h2
            className={`
              text-center font-[700] uppercase
              pt-[100px] pb-[60px] text-[52px]
              md:pt-[60px] md:pb-[80px] md:text-[100px]
              lg:pt-[80px] lg:pb-[100px] lg:text-[140px]
            `}
          >
            search
          </h2>

          <SearchBar
            query={searchQuery}
            onQueryChange={setSearchQuery}
            results={matchedArtworks}
          />
        </div>
      </div>

      <div className="w-full px-global">
        <div className="max-w-[1440px] mx-auto w-full">
          <div
            className={`
              my-[24px]
              md:bg-background md:my-[28px] md:p-[28px] md:border-[1px] md:border-primary
              lg:my-[32px] lg:p-[32px]
            `}
          >
            <div
              className={`
                bg-background md:bg-transparent
                border-primary border-[1px] px-[8px] py-[16px]
                md:border-none md:p-0
              `}
            >
              {displayedArtworks.length > 0 ? (
                <ArtworkGrid artworks={displayedArtworks} />
              ) : (
                <div className="flex flex-col items-center justify-center py-[80px] md:py-[120px] text-center text-primary select-none">
                  <span className="text-[20px] md:text-[28px] font-[200] uppercase tracking-[1px]">
                    No artworks found
                  </span>
                  <span className="text-[12px] md:text-[14px] font-[300] mt-[12px] opacity-60">
                    Try adjusting your search query to discover more works.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
