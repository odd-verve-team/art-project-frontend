import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useAuthStore } from '@/store/useAuthStore';

import { getFullName } from '@/utils/getFullName';
import type { Artwork } from '@/types/artwork';
import type { ArtistArtworkMin } from '@/types/artist';

import { DEFAULT_AVATAR } from '@/constants/common';
import HeartIcon from '@/assets/heart-icon.svg';
import HeartActiveIcon from '@/assets/heart-filled-icon.svg';

export const ArtworkCard = ({ artwork }: { artwork: Artwork | ArtistArtworkMin }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const favoriteArtworkIds = useFavoritesStore((state) => state.favoriteArtworkIds);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const isFavorite = favoriteArtworkIds.has(artwork.id);
  const size = `${artwork.image_width} / ${artwork.image_height}`;
  const authorName = getFullName(
    artwork.artist?.first_name,
    artwork.artist?.last_name,
  );
  const avatarUrl = artwork.artist?.avatar_url || DEFAULT_AVATAR;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    toggleFavorite(artwork as Artwork);
  };

  return (
    <Link
      to={`/gallery/${artwork.id}`}
      style={{ aspectRatio: size }}
      className="relative group overflow-hidden cursor-pointer"
    >
      <img
        src={artwork.image_url}
        alt={artwork.title || authorName}
        onLoad={() => setIsLoaded(true)}
        className={`
          absolute inset-0 w-full h-full object-cover border-[1px] border-primary transition-opacity duration-700 ease-in-out
          p-[8px]
          md:p-[16px]
          lg:p-[24px]
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />

      <div
        className={`
          absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/60 via-primary/50 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none
          p-[8px]
          md:p-[16px]
          lg:p-[24px]
        `}
      >
        <div className="w-full flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-[8px] bg-white p-[8px]">
            <img
              src={avatarUrl}
              alt={authorName}
              className="w-[24px] h-[24px] rounded-full object-cover"
            />
            <span
              className={`
                text-primary text-[12px] font-[700] leading-none tracking-wide uppercase
              `}
            >
              {authorName}
            </span>
          </div>
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="p-[5px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <img src={isFavorite ? HeartActiveIcon : HeartIcon} alt="Add to favourite" />
          </button>
        </div>
      </div>
    </Link>
  );
};
