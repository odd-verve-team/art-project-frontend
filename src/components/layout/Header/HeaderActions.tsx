import { Link } from 'react-router-dom';

import { useAppStore } from '@/store/useAppStore';

import { HEADER_HOVER } from './headerConstants';

import SearchIcon from '@/assets/search-icon.svg';

export const HeaderActions = () => {
  const openModal = useAppStore((state) => state.openModal);

  return (
    <div className="flex items-center gap-[24px]">
      <button
        onClick={() => openModal('contact-us')}
        className={`
          w-[164px] h-[43px] border-[1px] text-[16px] cursor-pointer 
          font-[500] text-background uppercase tracking-[0.1em] 
          ${HEADER_HOVER}
        `}
      >
        contact us
      </button>
      <Link to="/search" className={HEADER_HOVER}>
        <img src={SearchIcon} alt="Search" />
      </Link>
    </div>
  );
};
