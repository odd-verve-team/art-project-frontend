import { useEffect } from 'react';

import { useArtworkStore } from '@/store/useArtworkStore';

import { ArtworkGrid } from '@/components/features/Artworks/ArtworkGrid';
import { GalleryToolbar } from '@/components/features/Gallery/GalleryToolbar';
import { Loader } from '@/components/ui/Loader';

import { formatGalleryParams } from '@/utils/galleryFilters';
import { DEFAULT_PAGE } from '@/components/features/Gallery/galleryConstants';

export const GalleryPage = () => {
  const galleryArtworks = useArtworkStore((state) => state.galleryArtworks);
  const fetchGalleryArtworks = useArtworkStore(
    (state) => state.fetchGalleryArtworks,
  );
  const filters = useArtworkStore((state) => state.filters);
  const sort = useArtworkStore((state) => state.sort);
  const meta = useArtworkStore((state) => state.meta);
  const isLoading = useArtworkStore((state) => state.isLoading);

  useEffect(() => {
    const params = formatGalleryParams(filters, sort);
    params.page = DEFAULT_PAGE;
    fetchGalleryArtworks(params, false);
  }, [filters, sort, fetchGalleryArtworks]);

  const handleLoadMore = () => {
    if (meta && meta.page < meta.totalPages) {
      const params = formatGalleryParams(filters, sort);
      params.page = meta.page + 1;
      fetchGalleryArtworks(params, true);
    }
  };

  const isInitialLoading = isLoading && galleryArtworks.length === 0;

  return (
    <div>
      <h2
        className={`
          bg-primary text-center text-background font-[700] uppercase
          pt-[100px] pb-[100px] text-[52px]
          md:pt-[60px] md:pb-[80px] md:text-[100px]
          lg:pt-[80px] lg:pb-[110px] lg:text-[140px]
        `}
      >
        gallery
      </h2>

      <div className="w-full px-global">
        <div className="max-w-[1440px] mx-auto w-full">
          <div
            className={`
              bg-background
              my-[24px]
              md:my-[28px] md:p-[28px] md:border-[1px] md:border-primary
              lg:my-[32px] lg:p-[32px]
            `}
          >
            <GalleryToolbar />

            <div
              className={`
                border-primary
                border-[1px] px-[8px] py-[16px]
                md:border-none md:p-0
              `}
            >
              {isInitialLoading ? (
                <Loader text="Loading artworks..." />
              ) : (
                <ArtworkGrid artworks={galleryArtworks} />
              )}
            </div>
          </div>

          {meta && meta.page < meta.totalPages && (
            <div
              className={`
                flex justify-center items-center min-h-[44px]
                pb-[24px]
                lg:pt-[30px] lg:pb-[62px]
              `}
            >
              {isLoading && !isInitialLoading ? (
                <Loader compact text="" />
              ) : (
                <button
                  onClick={handleLoadMore}
                  className={`
                    text-primary font-[300] uppercase transition-opacity
                    duration-300 hover:opacity-70
                    text-[16px]/[24px]
                    lg:text-[24px]
                  `}
                >
                  See More
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
