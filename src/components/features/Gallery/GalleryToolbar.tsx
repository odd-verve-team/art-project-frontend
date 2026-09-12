import { useState } from 'react';

import { useArtworkStore } from '@/store/useArtworkStore';

import { SortingDropdown } from './SortingDropdown';
import { FilterPanel } from './FilterPanel';

import FilterIcon from '@/assets/filter-icon.svg';
import SortingIcon from '@/assets/sorting-icon.svg';

const BTN_BASE = `
  flex items-center gap-[8px] text-primary font-[600] cursor-pointer focus:outline-none
  text-[16px]
  md:text-[20px]
  lg:text-[24px]
`;
const BTN_HOVER =
  'hover:opacity-70 transition-opacity duration-500 ease-in-out';
const BTN_ACTIVE = '';

export const GalleryToolbar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortingOpen, setIsSortingOpen] = useState(false);

  const filters = useArtworkStore((state) => state.filters);
  const setFilters = useArtworkStore((state) => state.setFilters);
  const sort = useArtworkStore((state) => state.sort);
  const setSort = useArtworkStore((state) => state.setSort);

  return (
    <div
      className={`
        relative flex justify-between items-center
        mb-[8px]
        md:mb-[12px] md:mt-[20px]
        lg:mb-[16px] lg:mt-[30px]
      `}
    >
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        aria-expanded={isFilterOpen}
        className={`${BTN_BASE} ${BTN_HOVER} ${isFilterOpen ? BTN_ACTIVE : ''}`}
      >
        Filter
        <img
          src={FilterIcon}
          aria-hidden="true"
          className={`
            w-[16px] h-[16px]
            md:w-[18px] md:h-[18px]
            lg:w-auto lg:h-auto
          `}
        />
      </button>

      {isFilterOpen && (
        <FilterPanel
          initialFilters={filters}
          onApply={(newFilters) => setFilters(newFilters)}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      <div>
        <button
          onClick={() => setIsSortingOpen(!isSortingOpen)}
          aria-expanded={isSortingOpen}
          className={`${BTN_BASE} ${BTN_HOVER} ${isSortingOpen ? BTN_ACTIVE : ''}`}
        >
          Sorting
          <img
            src={SortingIcon}
            aria-hidden="true"
            className={`
              w-[12px] h-[20px]
              md:w-[16px] md:h-[30px]
              lg:w-auto lg:h-auto
            `}
          />
        </button>

        {isSortingOpen && (
          <SortingDropdown
            activeSort={sort}
            onApply={(value) => setSort(value)}
            onClose={() => setIsSortingOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
