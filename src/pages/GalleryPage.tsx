import { useEffect } from 'react';

import { useArtworkStore } from '@/store/useArtworkStore';

import { ArtworkGrid } from '@/components/features/Artworks/ArtworkGrid';
import { GalleryToolbar } from '@/components/features/Gallery/GalleryToolbar';

import { formatGalleryParams } from '@/utils/galleryFilters';
import { DEFAULT_PAGE } from '@/components/features/Gallery/galleryConstants';

export const GalleryPage = () => {
  const galleryArtworks = useArtworkStore((state) => state.galleryArtworks);
  const fetchGalleryArtworks = useArtworkStore((state) => state.fetchGalleryArtworks);
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
  }

  return (
    <div className="">
      <h2
        className={`
        bg-primary pt-[80px] pb-[110px] text-center
        text-background text-[140px] font-[700] uppercase
      `}
      >
        gallery
      </h2>
      <div className="mx-global my-[32px] p-[32px] border-[1px] border-primary bg-background">
        <GalleryToolbar />
        <ArtworkGrid artworks={galleryArtworks} />
      </div>

      {meta && meta.page < meta.totalPages && (
        <div className="flex justify-center pt-[30px] pb-[62px]">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className={`
              text-primary text-[24px] font-[300] uppercase 
              transition-opacity duration-300 hover:opacity-70 disabled:opacity-50
            `}
          >
            {isLoading ? 'Loading...' : 'See More'}
          </button>
        </div>
      )}
    </div>
  );
};
