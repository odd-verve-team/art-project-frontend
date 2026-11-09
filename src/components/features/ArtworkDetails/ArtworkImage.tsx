import { useLocation, useNavigate } from 'react-router-dom';

import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useAuthStore } from '@/store/useAuthStore';

import type { Artwork } from '@/types/artwork';

import HeartIcon from '@/assets/heart-icon.svg';
import HeartActiveIcon from '@/assets/heart-filled-icon.svg';

interface Props {
  artwork: Artwork;
  className?: string;
}

export const ArtworkImage = ({ artwork, className = '' }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const favoriteArtworkIds = useFavoritesStore((state => state.favoriteArtworkIds));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const isFavorite = favoriteArtworkIds.has(artwork.id);
  const { title, image_url } = artwork;
  const date = artwork.created_at
    ? new Date(artwork.created_at).toLocaleDateString('en-GB')
    : 'xx/xx/xxxx';
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    } else {
      toggleFavorite(artwork);
    }
  }

  return (
    <section
      className={`
        border-b border-primary -mx-global px-global
        lg:mx-0 lg:px-0
        ${className}
      `}
    >
      <div
        className={`
          relative flex items-center justify-center
          h-full border-x border-primary p-[45px]
          lg:border-x-0 lg:p-[min(6.94vw,100px)]
        `}
      >
        <div
          className={`
            absolute top-0 left-0 w-full flex justify-between
            items-center pointer-events-none p-[12px]
            text-primary/50 text-[12px] font-[300] uppercase
            lg:text-[min(1.11vw,16px)] lg:py-[min(1.11vw,16px)] lg:px-[min(1.66vw,24px)]
          `}
        >
          <span>artwork</span>
          <span>{date}</span>
        </div>

        <img
          src={image_url}
          alt={title}
          className={`
            max-w-full max-h-full object-contain
            lg:w-full lg:h-full
          `}
        />

        <div
          className={`
            absolute bottom-0 right-0 flex p-[10px]
            lg:hidden
          `}
        >
          <button
            type="button"
            className='cursor-pointer'
            onClick={handleFavoriteClick}
          >
            <img
              src={isFavorite ? HeartActiveIcon : HeartIcon}
              alt="Add to favorite"
              className={`
                transition-transform duration-300 ease-in-out hover:scale-110
                ${isFavorite ? '' : 'invert opacity-40 transition-opacity hover:opacity-100'}
              `}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
