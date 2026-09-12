import { useEffect, useRef, useState } from 'react';

import { SORT_OPTIONS } from '@/components/features/Gallery/galleryConstants';
import type { ArtworkSort } from '@/types/artwork';

interface Props {
  activeSort?: ArtworkSort;
  onApply: (value?: ArtworkSort) => void;
  onClose: () => void;
}

const OPTION_BTN_BASE = `
  py-[16px] px-[24px] text-left text-[14px] font-[600] uppercase 
  transition-colors duration-300 cursor-pointer
`;

const ACTION_BTN_BASE = `
  flex-1 text-[14px] font-[600] uppercase cursor-pointer transition-all
`;

export const SortingDropdown = ({ activeSort, onApply, onClose }: Props) => {
  const [draftSort, setDraftSort] = useState<ArtworkSort | undefined>(
    activeSort,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
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
      ref={dropdownRef}
      className={`
        absolute z-50 flex flex-col bg-background border-primary
        top-full mt-[8px] w-screen left-1/2 -translate-x-1/2 border-y-[1px] border-x-0
        [@media(min-width:624px)]:w-[340px] [@media(min-width:624px)]:left-auto [@media(min-width:624px)]:right-0 [@media(min-width:624px)]:translate-x-0 [@media(min-width:624px)]:border-[1px]
        md:mt-[12px]
        lg:mt-[16px]
      `}
    >
      <div className="flex flex-col divide-y-[1px] divide-primary border-b-[1px] border-primary">
        {SORT_OPTIONS.map((option) => {
          const isActive = draftSort === option.value;

          return (
            <button
              key={option.value}
              onClick={
                !isActive
                  ? () => setDraftSort(option.value)
                  : () => setDraftSort(undefined)
              }
              className={`
                ${OPTION_BTN_BASE}
                ${
                  isActive
                    ? 'bg-primary text-background'
                    : 'text-primary hover:bg-gray-100'
                }
              `}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="flex h-[56px]">
        <button
          onClick={onClose}
          className={`
            ${ACTION_BTN_BASE} 
            text-primary border-r-[1px] border-primary hover:bg-gray-100
          `}
        >
          Close
        </button>

        <button
          onClick={() => {
            onApply(draftSort);
            onClose();
          }}
          className={`
            ${ACTION_BTN_BASE} 
            bg-primary text-background hover:opacity-80
          `}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
