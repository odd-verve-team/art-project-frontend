import { ArtworkGrid } from '@/components/features/Artworks/ArtworkGrid';
import { GalleryToolbar } from '@/components/features/GalleryToolbar';
import { useArtworkStore } from '@/store/useArtworkStore';
import { useEffect } from 'react';

export const GalleryPage = () => {
  const galleryArtworks = useArtworkStore((state) => state.galleryArtworks);
  const fetchGalleryArtworks = useArtworkStore(
    (state) => state.fetchGalleryArtworks,
  );

  useEffect(() => {
    fetchGalleryArtworks({ status: 'approved' });
  }, [fetchGalleryArtworks]);

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
      <div className="mx-global my-[32px] p-[32px] border-[1px] border-primary">
        <GalleryToolbar />
        <ArtworkGrid artworks={galleryArtworks} />
      </div>
    </div>
  );
};
