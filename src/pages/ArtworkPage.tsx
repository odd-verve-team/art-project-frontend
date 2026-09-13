import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useArtworkStore } from '@/store/useArtworkStore';
import { Loader } from '@/components/ui/Loader';

export const ArtworkPage = () => {
  const { id } = useParams<{ id: string }>();

  const currentArtwork = useArtworkStore((state) => state.currentArtwork);
  const fetchArtworkById = useArtworkStore((state) => state.fetchArtworkById);
  const clearCurrentArtwork = useArtworkStore((state) => state.clearCurrentArtwork);
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

  return (
    <div>
      <h1>{currentArtwork.title}</h1>
      <p>
        {currentArtwork.artist.first_name} {currentArtwork.artist.last_name}
      </p>
    </div>
  );
};