import { getFullName } from '@/utils/getFullName';
import { DEFAULT_AVATAR } from '@/constants/common';
import type { ArtistDetail } from '@/types/artist';

interface Props {
  artist: ArtistDetail;
  className?: string;
}

export const ArtistPortrait = ({ artist, className = '' }: Props) => {
  const name = getFullName(artist.first_name, artist.last_name);
  const image = artist.image_url || DEFAULT_AVATAR;
  const date = artist.created_at
    ? new Date(artist.created_at).toLocaleDateString('en-GB')
    : 'xx/xx/xxxx';

  return (
    <section
      className={`
        border-b border-primary -mx-global px-global
        lg:mx-0 lg:px-0 lg:border-r
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
          <span>artist portrait</span>
          <span>{date}</span>
        </div>

        <img
          src={image}
          alt={name}
          className={`
            max-w-full max-h-full object-contain
            lg:w-full lg:h-full
          `}
        />
      </div>
    </section>
  );
};
