import { useEffect, useRef } from 'react';

import CloseIcon from '@/assets/close-icon.svg';

interface Props {
  onClose: () => void;
}

const ACTION_BTN = `
  w-[156px] h-[44px] text-[14px] font-[600] uppercase cursor-pointer transition-all
`;

export const FilterPanel = ({ onClose }: Props) => {
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

      <div className="grid grid-cols-2 gap-x-[165px] gap-y-[32px] m-[55px_45px_24px_40px]">
        <div>PRICE</div>
        <div>YEAR</div>

        <div>SUBJECT</div>
        <div>SIZE</div>

        <div>MEDIUM</div>
        <div>STATUS</div>
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
