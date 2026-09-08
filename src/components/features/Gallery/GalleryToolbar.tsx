import { useState } from 'react';

import { SortingDropdown } from './SortingDropdown';
import { FilterPanel } from './FilterPanel';

import FilterIcon from '@/assets/filter-icon.svg';
import SortingIcon from '@/assets/sorting-icon.svg';

const BTN_BASE = 'flex gap-[8px] items-center text-primary text-[24px] font-[600] cursor-pointer focus:outline-none';
const BTN_HOVER ='hover:opacity-70 transition-opacity duration-500 ease-in-out';
const BTN_ACTIVE = '';

export const GalleryToolbar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortingOpen, setIsSortingOpen] = useState(false);

  const [activeSort, setActiveSort] = useState('');

  return (
    <div className="relative flex justify-between items-center mb-[16px]">
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        aria-expanded={isFilterOpen}
        className={`${BTN_BASE} ${BTN_HOVER} ${isFilterOpen ? BTN_ACTIVE : ''}`}
      >
        Filter
        <img src={FilterIcon} aria-hidden="true" />
      </button>

      {isFilterOpen && (
        <FilterPanel
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      <div className="relative">
        <button
          onClick={() => setIsSortingOpen(!isSortingOpen)}
          aria-expanded={isSortingOpen}
          className={`${BTN_BASE} ${BTN_HOVER} ${isSortingOpen ? BTN_ACTIVE : ''}`}
        >
          Sorting
          <img src={SortingIcon} aria-hidden="true" />
        </button>

        {isSortingOpen && (
          <SortingDropdown
            activeSort={activeSort}
            onApply={(value) => setActiveSort(value)}
            onClose={() => setIsSortingOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
