import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/utils/cn';
import ArrowIcon from '@/assets/social-arrow-icon.svg';

export interface DropdownOption<T extends number | string> {
  label: string | number;
  value: T;
}

interface Props<T extends number | string> {
  label: string;
  value: string | number | undefined;
  options: DropdownOption<T>[];
  onSelect: (value: T) => void;
  placeholder?: string;
}

export const ProfileFormDropdown = <T extends number | string>({
  label,
  value,
  options,
  onSelect,
  placeholder = 'CHOOSE',
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  return (
    <div
      ref={menuRef}
      className={`
        relative flex items-center justify-between pb-[4px] cursor-pointer
        border-b border-primary transition-colors duration-300
        focus-within:border-primary/50
      `}
      onClick={() => setIsOpen(!isOpen)}
    >
      <label
        className="text-[12px] text-primary uppercase font-[400] tracking-[1px] shrink-0 cursor-pointer"
      >
        {label}
      </label>

      <div className="flex gap-[6px] flex-1 items-center justify-end ml-[16px] mr-[2px] select-none">
        <span className="text-right text-primary font-[500] text-[16px]/[24px]">
          {displayValue}
        </span>

        <img
          src={ArrowIcon}
          alt={`Toggle ${label} Dropdown`}
          className={cn(
            `w-[8px] h-[8px] invert pointer-events-none`,
            `transition-transform duration-300 ease-in-out`,
            '-rotate-45',
            isOpen && 'rotate-[135deg]'
          )}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 1 }} 
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`
              absolute top-[85%] right-0 mt-[4px] z-10 min-w-[120px] overflow-hidden
            `}
          >
            <div
              className={`
                flex flex-col max-h-[200px] overflow-y-auto overscroll-contain 
                bg-white border border-primary
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
              `}
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    `text-center p-[6px_16px] text-[16px] text-primary whitespace-nowrap`,
                    `transition-colors hover:bg-primary hover:text-white`,
                    value === option.value && 'bg-primary text-white'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
