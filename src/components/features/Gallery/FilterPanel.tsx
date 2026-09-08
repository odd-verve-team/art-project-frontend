import { useEffect, useRef, useState } from 'react';

import { FilterButtonGroup } from './FilterButtonGroup';
import { RangeSlider } from './RangeSlider';

import {
  SUBJECT_OPTIONS,
  MEDIUM_OPTIONS,
  SIZE_OPTIONS,
  STATUS_OPTIONS,
  FILTER_LIMITS,
} from './galleryConstants';

import CloseIcon from '@/assets/close-icon.svg';

type ArrayCategory = 'subject' | 'medium' | 'size' | 'status';
type NumberCategory = 'maxPrice' | 'maxYear';

const ACTION_BTN = `
  text-[14px] font-[500] uppercase cursor-pointer
  w-[156px] h-[44px] transition-all tracking-[1px]
`;

interface Props {
  onClose: () => void;
}

export const FilterPanel = ({ onClose }: Props) => {
  const [draftValues, setDraftValues] = useState({
    subject: [] as string[],
    medium: [] as string[],
    size: [] as string[],
    status: [] as string[],
    maxPrice: FILTER_LIMITS.MAX_PRICE as number,
    maxYear: FILTER_LIMITS.MAX_YEAR as number,
  });

  function handleToggle(category: ArrayCategory, value: string) {
    setDraftValues((prev) => {
      const currentValues = prev[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [category]: newValues };
    });
  };

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
      className={`
        absolute top-full left-0 z-50 mt-[16px] w-full px-[40px]
        flex flex-col bg-background border-[1px] border-primary
      `}
      ref={panelRef}
    >
      <button
        onClick={onClose}
        className={`
          absolute top-[40px] right-[40px]
          cursor-pointer hover:opacity-70 transition-opacity
        `}
        aria-label="Close filters"
      >
        <img src={CloseIcon} aria-hidden="true" />
      </button>

      <div
        className={`
          grid grid-cols-2 gap-x-[165px] gap-y-[32px] m-[55px_45px_24px_40px]
          uppercase text-primary font-[500] text-[16px]/[24px]
        `}
      >
        <RangeSlider
          title="price up to"
          min={FILTER_LIMITS.MIN_PRICE}
          max={FILTER_LIMITS.MAX_PRICE}
          step={FILTER_LIMITS.PRICE_STEP}
          value={draftValues.maxPrice}
          onChange={(value) => handleSliderChange('maxPrice', value)}
          formatValue={(val) => val.toLocaleString('uk-UA')}
        />
        <RangeSlider
          title="year up to"
          min={FILTER_LIMITS.MIN_YEAR}
          max={FILTER_LIMITS.MAX_YEAR}
          step={FILTER_LIMITS.YEAR_STEP}
          value={draftValues.maxYear}
          onChange={(value) => handleSliderChange('maxYear', value)}
        />
        <FilterButtonGroup
          title="subject / genre"
          options={SUBJECT_OPTIONS}
          selectedValues={draftValues.subject}
          onToggle={(value) => handleToggle('subject', value)}
        />
        <FilterButtonGroup
          title="size"
          options={SIZE_OPTIONS}
          selectedValues={draftValues.size}
          onToggle={(value) => handleToggle('size', value)}
        />
        <FilterButtonGroup
          title="medium"
          options={MEDIUM_OPTIONS}
          selectedValues={draftValues.medium}
          onToggle={(value) => handleToggle('medium', value)}
        />
        <FilterButtonGroup
          title="status"
          options={STATUS_OPTIONS}
          selectedValues={draftValues.status}
          onToggle={(value) => handleToggle('status', value)}
        />
      </div>

      <div className="flex justify-end gap-[16px] mb-[80px]">
        <button
          onClick={onClose}
          className={`
            ${ACTION_BTN} 
            text-primary border-[1px] border-primary hover:bg-gray-100
          `}
        >
          Close
        </button>

        <button
          onClick={() => {
            console.log('Apply:', '');
          }}
          className={`
            ${ACTION_BTN} 
            bg-primary text-background hover:opacity-80
          `}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
