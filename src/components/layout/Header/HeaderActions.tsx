import { Link } from 'react-router-dom';

import { useAppStore } from '@/store/useAppStore';

import { HEADER_HOVER, type HeaderTheme } from './headerConstants';

import SearchIcon from '@/assets/search-icon.svg';

export const HeaderActions = ({ theme }: { theme: HeaderTheme }) => {
  const openModal = useAppStore((state) => state.openModal);
  const isLightMode = theme === 'light';

  return (
    <div className="flex items-center gap-[24px]">
      <button
        onClick={() => openModal('contact-us')}
        className={`
          w-[164px] h-[43px] border-[1px] text-[16px] cursor-pointer 
          font-[500] uppercase tracking-[0.1em] transition-colors duration-500
          ${isLightMode ? 'text-primary border-primary' : 'text-background border-background'}
          ${HEADER_HOVER}
        `}
      >
        contact us
      </button>
      <Link to="/search" className={HEADER_HOVER}>
        <img
          src={SearchIcon}
          alt="Search"
          className={`
            transition-[filter] duration-500
            ${isLightMode ? 'invert' : ''}
          `}
        />
      </Link>
    </div>
  );
};
