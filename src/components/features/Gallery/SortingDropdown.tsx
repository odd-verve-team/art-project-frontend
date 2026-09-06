import { useState } from 'react';
import { SORT_OPTIONS } from '@/components/features/Gallery/galleryConstants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const OPTION_BTN = `
  py-[16px] px-[24px] text-left text-[14px] font-[600] uppercase 
  transition-colors duration-300 cursor-pointer
`;

const ACTION_BTN = `
  flex-1 text-[14px] font-[600] uppercase cursor-pointer transition-all
`;

export const SortingDropdown = ({ isOpen, onClose }: Props) => {
  const [selected, setSelected] = useState<string>('');

  if (!isOpen) return null;

  return (
    <div
      className={`
        absolute top-full right-0 z-50 mt-[16px] w-[340px] 
        flex flex-col bg-background border-[1px] border-primary
      `}
    >
      <div className="flex flex-col divide-y-[1px] divide-primary border-b-[1px] border-primary">
        {SORT_OPTIONS.map((option) => {
          const isActive = selected === option.value;

          return (
            <button
              key={option.value}
              onClick={() => setSelected(option.value)}
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
            console.log('Apply:', selected);
            onClose();
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
