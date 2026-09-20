import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useArtworkStore } from '@/store/useArtworkStore';
import { Loader } from '@/components/ui/Loader';

import { ArtworkImage } from '@/components/features/ArtworkDetails/ArtworkImage';
import { ArtworkInfo } from '@/components/features/ArtworkDetails/ArtworkInfo';
import { RecommendedArtworks } from '@/components/features/ArtworkDetails/RecommendedArtworks';
import { ArtworkDescription } from '@/components/features/ArtworkDetails/ArtworkDescription';
import { ArtworkOrderForm } from '@/components/features/ArtworkDetails/ArtworkOrderForm';
import { ArtworkAuthorInfo } from '@/components/features/ArtworkDetails/ArtworkAuthorInfo';

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

  const { title } = currentArtwork;

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
        <h2
          className={`
            font-[500] text-[52px]
            lg:text-center lg:text-[min(6.25vw,90px)] lg:leading-[min(6.94vw,100px)]
          `}
        >
          {title}
        </h2>
      </div>

      <div
        className={`
          flex flex-col
          lg:grid lg:grid-cols-[2fr_1fr] lg:max-w-[1440px] lg:mx-auto lg:border-x lg:border-primary
        `}
      >
        <div
          className={`
            contents
            lg:block lg:border-r lg:border-primary
          `}
        >
          <ArtworkImage
            artwork={currentArtwork}
            className={`
              order-1 h-[420px]
              lg:order-none lg:h-[min(59.02vw,850px)]
            `}
          />
          <ArtworkAuthorInfo
            artistId={currentArtwork.artist.id}
            className={`
              order-4
              lg:order-none lg:h-[min(40.97vw,590px)]
            `}
          />
        </div>

        <div
          className={`
            contents
            lg:flex lg:flex-col
          `}
        >
          <ArtworkInfo
            artwork={currentArtwork}
            className={`
              order-2
              lg:order-none lg:h-[min(30.2vw,435px)]
            `}
          />
          <ArtworkDescription
            artwork={currentArtwork}
            className={`
              order-3 min-h-[200px]
              lg:order-none lg:min-h-0 lg:h-[min(20.48vw,295px)]
            `}
          />
          <RecommendedArtworks
            artworkId={currentArtwork.id}
            artworkCategory={currentArtwork.category}
            className={`
              order-5
              lg:order-none lg:h-[min(49.3vw,710px)]
            `}
          />
        </div>
      </div>

      <ArtworkOrderForm
        artwork={currentArtwork}
        className={`
          lg:max-w-[1440px] lg:mx-auto
        `}
      />
    </div>
  );
};