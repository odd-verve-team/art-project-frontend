import { useEffect, useRef, useState } from 'react';
import { SORT_OPTIONS } from '@/components/features/Gallery/galleryConstants';

interface Props {
  activeSort: string;
  onApply: (value: string) => void;
  onClose: () => void;
}

const OPTION_BTN = `
  py-[16px] px-[24px] text-left text-[14px] font-[600] uppercase 
  transition-colors duration-300 cursor-pointer
`;

const ACTION_BTN = `
  flex-1 text-[14px] font-[600] uppercase cursor-pointer transition-all
`;

export const SortingDropdown = ({ activeSort, onApply, onClose }: Props) => {
  const [draftSort, setDraftSort] = useState<string>(activeSort);
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
      className={`
        absolute top-full right-0 z-50 mt-[16px] w-[340px] 
        flex flex-col bg-background border-[1px] border-primary
      `}
      ref={dropdownRef}
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
                  : () => setDraftSort('')
              }
              className={`
                ${OPTION_BTN}
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
            ${ACTION_BTN} 
            text-primary border-r-[1px] border-primary hover:bg-gray-100
          `}
        >
          Close
        </button>

        <button
          onClick={() => {
            console.log('Apply:', draftSort);
            onApply(draftSort);
            onClose()
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
