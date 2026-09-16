import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useArtworkStore } from '@/store/useArtworkStore';
import { Loader } from '@/components/ui/Loader';

import { ArtworkImage } from '@/components/features/ArtworkDetails/ArtworkImage';
import { ArtworkInfo } from '@/components/features/ArtworkDetails/ArtworkInfo';
import { RecommendedArtworks } from '@/components/features/ArtworkDetails/RecommendedArtworks';
import { ArtworkDescription } from '@/components/features/ArtworkDetails/ArtworkDescription';

export const ArtworkPage = () => {
  const { id } = useParams<{ id: string }>();

  const currentArtwork = useArtworkStore((state) => state.currentArtwork);
  const fetchArtworkById = useArtworkStore((state) => state.fetchArtworkById);
  const clearCurrentArtwork = useArtworkStore(
    (state) => state.clearCurrentArtwork,
  );
  const isLoading = useArtworkStore((state) => state.isLoading);
  const error = useArtworkStore((state) => state.error);

  useEffect(() => {
    if (id) fetchArtworkById(Number(id));
    return () => clearCurrentArtwork();
  }, [id, fetchArtworkById, clearCurrentArtwork]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !currentArtwork) {
    return <p>{error || 'Artwork not found'}</p>;
  }

  const { title } = currentArtwork;

  return (
    <div className="px-global min-h-[calc(100svh-var(--header-height))] relative mb-[32px]">
      <div className="mt-[65px] pb-[24px] border-b-[1px] border-primary -mx-global px-global">
        <h2 className="text-[52px]">{title}</h2>
      </div>

      <ArtworkImage 
        artwork={currentArtwork} 
        className="h-[420px]"
      />
      <ArtworkInfo 
        artwork={currentArtwork} 
        className=""
      />
      <ArtworkDescription
        artwork={currentArtwork}
        className="min-h-[200px]"
      />
      <RecommendedArtworks 
        artworkId={currentArtwork.id} 
        artworkCategory={currentArtwork.category}
        className=""
      />
    </div>
  );
};