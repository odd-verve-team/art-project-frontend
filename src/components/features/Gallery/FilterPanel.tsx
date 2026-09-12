import { useEffect, useRef, useState } from 'react';

import { FilterButtonGroup } from './FilterButtonGroup';
import { RangeSlider } from './RangeSlider';

import type { GalleryFilterState } from '@/types/gallery';
import {
  CATEGORY_OPTIONS,
  MEDIUM_OPTIONS,
  SIZE_OPTIONS,
  STATUS_OPTIONS,
  FILTER_LIMITS,
  DEFAULT_FILTERS,
} from './galleryConstants';

import CloseIcon from '@/assets/close-icon.svg';

type ArrayCategory = 'category' | 'medium' | 'size' | 'status';
type NumberCategory = 'maxPrice' | 'maxYear';

const ACTION_BTN_BASE = `
  flex justify-center items-center font-[500] uppercase cursor-pointer transition-all tracking-[1px]
`;

interface Props {
  initialFilters: GalleryFilterState;
  onApply: (filters: GalleryFilterState) => void;
  onClose: () => void;
}

export const FilterPanel = ({ initialFilters, onApply, onClose }: Props) => {
  const [draftValues, setDraftValues] =
    useState<GalleryFilterState>(initialFilters);

  function handleToggle(category: ArrayCategory, value: string) {
    setDraftValues((prev) => {
      const currentValues = prev[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return { ...prev, [category]: newValues };
    });
  }

  function handleSliderChange(category: NumberCategory, value: number) {
    setDraftValues((prev) => ({ ...prev, [category]: value }));
  }

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className={`
        absolute z-50 top-full flex flex-col bg-background border-primary
        mt-[8px] w-screen left-1/2 -translate-x-1/2 border-y-[1px] border-x-0
        [@media(min-width:624px)]:w-full [@media(min-width:624px)]:left-0 [@media(min-width:624px)]:translate-x-0 [@media(min-width:624px)]:border-[1px]
        md:mt-[12px]
        lg:mt-[16px]
      `}
    >
      <button
        onClick={onClose}
        aria-label="Close filters"
        className={`
          absolute cursor-pointer hover:opacity-70 transition-opacity
          w-[16px] h-[16px] top-[16px] right-[16px]
          md:w-[20px] md:h-[20px] md:top-[24px] md:right-[24px]
          lg:w-auto lg:h-auto lg:top-[40px] lg:right-[40px]
        `}
      >
        <img src={CloseIcon} aria-hidden="true" />
      </button>

      <div
        className={`
          grid text-primary font-[500] uppercase
          grid-cols-1 gap-y-[32px] m-[56px_16px_32px_16px]
          md:m-[64px_24px_32px_24px]
          lg:grid-cols-2 lg:gap-x-[165px] lg:m-[55px_45px_24px_40px]
        `}
      >
        <div className="order-1 lg:order-none">
          <RangeSlider
            title="price up to"
            min={FILTER_LIMITS.MIN_PRICE}
            max={FILTER_LIMITS.MAX_PRICE}
            step={FILTER_LIMITS.PRICE_STEP}
            value={draftValues.maxPrice}
            onChange={(value) => handleSliderChange('maxPrice', value)}
            formatValue={(val) => val.toLocaleString('uk-UA')}
          />
        </div>

        <div className="order-4 lg:order-none">
          <RangeSlider
            title="year up to"
            min={FILTER_LIMITS.MIN_YEAR}
            max={FILTER_LIMITS.MAX_YEAR}
            step={FILTER_LIMITS.YEAR_STEP}
            value={draftValues.maxYear}
            onChange={(value) => handleSliderChange('maxYear', value)}
          />
        </div>

        <div className="order-2 lg:order-none">
          <FilterButtonGroup
            title="subject / genre"
            options={CATEGORY_OPTIONS}
            selectedValues={draftValues.category}
            onToggle={(value) => handleToggle('category', value)}
          />
        </div>

        <div className="order-5 lg:order-none">
          <FilterButtonGroup
            title="size"
            options={SIZE_OPTIONS}
            selectedValues={draftValues.size}
            onToggle={(value) => handleToggle('size', value)}
          />
        </div>

        <div className="order-3 lg:order-none">
          <FilterButtonGroup
            title="medium"
            options={MEDIUM_OPTIONS}
            selectedValues={draftValues.medium}
            onToggle={(value) => handleToggle('medium', value)}
          />
        </div>

        <div className="order-6 lg:order-none">
          <FilterButtonGroup
            title="status"
            options={STATUS_OPTIONS}
            selectedValues={draftValues.status}
            onToggle={(value) => handleToggle('status', value)}
          />
        </div>
      </div>

      <div
        className={`
          flex w-full
          lg:justify-end lg:gap-[16px] lg:mb-[80px] lg:px-[40px]
        `}
      >
        <button
          onClick={() => setDraftValues(DEFAULT_FILTERS)}
          className={`
            ${ACTION_BTN_BASE} text-primary bg-background hover:bg-gray-100 border-primary
            w-1/2 h-[56px] text-[16px] border-t-[1px] border-r-[1px]
            lg:w-[156px] lg:h-[44px] lg:border-[1px]
          `}
        >
          Reset
        </button>

        <button
          onClick={() => {
            onApply(draftValues);
            onClose();
          }}
          className={`
            ${ACTION_BTN_BASE} text-background bg-primary hover:opacity-80 border-primary
            w-1/2 h-[56px] text-[16px] border-t-[1px]
            lg:w-[156px] lg:h-[44px] lg:border-none
          `}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
