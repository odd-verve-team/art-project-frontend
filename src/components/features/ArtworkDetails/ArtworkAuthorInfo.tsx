import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useUserStore } from '@/store/useUserStore';
import type { UserDetail } from '@/types/user';

import ArrowIcon from '@/assets/social-arrow-icon.svg';
import { Loader } from '@/components/ui/Loader';

interface Props {
  artistId: number;
  className?: string;
}

export const ArtworkAuthorInfo = ({ artistId, className = '' }: Props) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const fetchUserById = useUserStore((state) => state.fetchUserById);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);

  useEffect(() => {
    fetchUserById(artistId);
  }, [artistId, fetchUserById]);

  let content;

  if (isLoading) {
    content = (
      <div className="pt-[26px]">
        <Loader text="Loading..." compact />
      </div>
    );
  } else if (error) {
    content = (
      <div className="flex items-center justify-center py-[26px]">
        <p className="text-primary text-[14px] uppercase font-[600] tracking-[1px]">
          {error}
        </p>
      </div>
    );
  } else if (!currentUser) {
    content = null;
  } else {
    const {
      first_name,
      last_name,
      art_categories,
      avatar_url: image,
      bio,
    } = currentUser as UserDetail;
    const name = `${first_name} ${last_name}`;
    const categories = art_categories.join(' / ');

    content = (
      <>
        <span className="text-muted text-[12px] font-[300] uppercase">
          artist
        </span>
        <div className="flex flex-col gap-[3px] mt-[16px]">
          <span className="text-primary text-[16px] font-[600] uppercase">
            {name}
          </span>
          <span
            className={`
            text-muted text-[10px]/[20px] font-[500] 
            tracking-[1px] uppercase text-justify
          `}
          >
            {categories}
          </span>
        </div>

        <Link
          to={`/artists/${currentUser.id}`}
          className="group flex flex-col mt-[16px]"
        >
          <div
            className={`
            w-[177px] h-[229px] mx-auto 
            overflow-hidden mb-[16px]
          `}
          >
            <img
              src={image}
              alt={name}
              aria-hidden="true"
              className={`
                w-full h-full object-cover 
                transition-transform duration-500 ease-out 
                group-hover:scale-105
              `}
            />
          </div>

          <div className="flex gap-[16px] items-end">
            <span
              className={`
              text-primary text-[16px]/[18px] font-[300] 
              text-justify line-clamp-2 grow
              transition-colors duration-300 group-hover:text-primary/70
            `}
            >
              {bio}
            </span>
            <img
              src={ArrowIcon}
              aria-hidden="true"
              className={`
                w-[10px] h-[10px] invert mb-[3px] shrink-0 rotate-45 
                transition-[translate,opacity] duration-300 ease-out
                group-hover:opacity-70 group-hover:translate-x-[2px]
              `}
            />
          </div>
        </Link>

        <Link
          to={`/artists/${currentUser.id}`}
          className="group flex items-center gap-[8px] mt-[24px] w-fit"
        >
          <img
            src={image}
            alt={name}
            aria-hidden="true"
            className="w-[24px] h-[24px] rounded-full object-cover"
          />
          <span
            className={`
              text-primary text-[12px] font-[600] uppercase 
              transition-colors duration-300 group-hover:text-primary/70
            `}
          >
            {name}
          </span>
        </Link>
      </>
    );
  }

  return (
    <div
      className={`-mx-global px-global border-b border-primary ${className}`}
    >
      <div className="h-full border-x border-primary flex flex-col justify-center p-[12px]">
        {content}
      </div>
    </div>
  );
};
