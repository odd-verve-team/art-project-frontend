import { useEffect, useState } from 'react';

import { artworksApi } from '@/services/api';
import { useArtworkStore } from '@/store/useArtworkStore';
import { useDebounce } from '@/hooks/useDebounce';

import { ArtworkGrid } from '@/components/features/Artworks/ArtworkGrid';
import { SearchBar } from '@/components/features/Search/SearchBar';
import { Loader } from '@/components/ui/Loader';

import type { Artwork } from '@/types/artwork';

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Artwork[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const galleryArtworks = useArtworkStore((state) => state.galleryArtworks);
  const fetchGalleryArtworks = useArtworkStore((state) => state.fetchGalleryArtworks);
  const isGalleryLoading = useArtworkStore((state) => state.isLoading);

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const debouncedQuery = useDebounce(trimmedQuery, 300);

  const handleQueryChange = (value: string) => {
    setSearchQuery(value);

    if (!value.trim()) {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (galleryArtworks.length === 0) {
      fetchGalleryArtworks();
    }
  }, [galleryArtworks.length, fetchGalleryArtworks]);

  useEffect(() => {
    if (!debouncedQuery) return;

    let isCancelled = false;

    const fetchSearchResults = async () => {
      setIsSearching(true);
      try {
        const response = await artworksApi.search(debouncedQuery);
        if (!isCancelled) {
          setSearchResults(response);
        }
      } catch {
        if (!isCancelled) {
          setSearchResults([]);
        }
      } finally {
        if (!isCancelled) {
          setIsSearching(false);
        }
      }
    };

    fetchSearchResults();
    
    return () => {
      isCancelled = true
    };
  }, [debouncedQuery]);

  const hasQuery = Boolean(trimmedQuery);
  const isSearchPending = isSearching || trimmedQuery !== debouncedQuery;
  const displayedArtworks = hasQuery ? searchResults : galleryArtworks;
  const isGridLoading = hasQuery
    ? isSearchPending
    : isGalleryLoading && galleryArtworks.length === 0;

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
            onQueryChange={handleQueryChange}
            results={searchResults}
            isLoading={isSearchPending}
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
              {isGridLoading ? (
                <Loader text="Searching artworks..." />
              ) : displayedArtworks.length > 0 ? (
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
