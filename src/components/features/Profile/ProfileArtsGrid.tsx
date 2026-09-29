import { ProfileArtCard } from '@/components/features/Profile/ProfileArtCard'
import type { Artwork } from '@/types/artwork'

interface Props {
  artworks: Artwork[];
  artistName: string;
}

const getSortedArtworks = (artworksList: Artwork[]) => {
  return [
    ...artworksList.filter((artwork) => artwork.status === 'approved'),
    ...artworksList.filter((artwork) => artwork.status === 'pending'),
    ...artworksList.filter((artwork) => artwork.status === 'sold'),
    ...artworksList.filter((artwork) => artwork.status === 'rejected'),
  ];
};

export const ProfileArtsGrid = ({ artworks, artistName }: Props) => {
  const sortedArtworks = getSortedArtworks(artworks);

  //! TODO: Implement dynamic slot logic later
  //? availableSlots = user.number_of_paid_cell || 5
  //? usedSlots = artworks (pending + approved).length
  const availableSlots = 5;
  const usedSlots = 2;

  return (
    <div className="flex flex-col p-[8px] border border-primary">
      <div
        className={`
          mb-[8px] text-primary text-[12px]/[24px] 
          font-[500] tracking-[1px] uppercase
        `}
      >
        <span>{`arts ${usedSlots} / ${availableSlots}`}</span>
      </div>
      <div className="flex flex-col gap-[12px]">
        {sortedArtworks.map((artwork) => (
          <ProfileArtCard
            key={artwork.id}
            artwork={artwork}
            artistName={artistName}
          />
        ))}
      </div>
    </div>
  )
}