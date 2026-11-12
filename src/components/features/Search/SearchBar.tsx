import { Link } from 'react-router-dom';

import { getFullName } from '@/utils/getFullName';
import type { Artwork } from '@/types/artwork';

import SearchIcon from '@/assets/search-icon.svg';

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
  results: Artwork[];
}

export const SearchBar = ({ query, onQueryChange, results }: Props) => {
  const hasQuery = Boolean(query.trim());

  return (
    <div className="w-full">
      <div
        className={`
          flex items-center justify-between pb-[8px]
          border-b border-muted
          focus-within:border-background transition-colors duration-300
        `}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Enter a search query"
          aria-label="Search artworks"
          className={`
            w-full bg-transparent text-background outline-none
            text-[14px] font-[300] placeholder:text-muted
            md:text-[16px]
          `}
        />

        <img
          src={SearchIcon}
          alt="Search"
          className={`
            w-[18px] h-[18px] ml-[12px] shrink-0 opacity-80 pointer-events-none
            md:w-[20px] md:h-[20px]
          `}
        />
      </div>

      <div
        className={`
          h-[240px] pt-[16px] pb-[32px]
          md:h-[270px] md:pt-[24px] md:pb-[48px]
        `}
      >
        {hasQuery && (
          <div className="flex flex-col px-[12px] md:px-[24px]">
            {results.length > 0 ? (
              results.map((artwork) => {
                const authorName = getFullName(
                  artwork.artist?.first_name,
                  artwork.artist?.last_name,
                );

                return (
                  <Link
                    key={artwork.id}
                    to={`/gallery/${artwork.id}`}
                    className={`
                      py-[10px] border-b border-muted/50
                      text-background/80 text-[14px] font-[300]
                      hover:text-background transition-colors duration-300
                      md:py-[12px] md:text-[16px]
                    `}
                  >
                    {`${artwork.title} — ${authorName}`}
                  </Link>
                );
              })
            ) : (
              <div
                className={`
                  py-[10px] border-b border-muted/50
                  text-muted text-[14px] font-[300]
                  md:py-[12px] md:text-[16px]
                `}
              >
                No matching artworks found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
