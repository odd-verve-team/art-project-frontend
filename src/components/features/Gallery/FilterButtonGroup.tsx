interface Props {
  title: string;
  options: { label: string; value: string }[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}

export const FilterButtonGroup = ({
  title,
  options,
  selectedValues,
  onToggle,
}: Props) => {
  return (
    <div>
      <h3
        className={`
          mb-[12px] text-[14px]
          md:mb-[16px] md:text-[16px]
        `}
      >
        {title}
      </h3>
      <div
        className={`
          flex flex-wrap
          gap-[6px]
          md:gap-[8px]
        `}
      >
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);

          return (
            <button
              key={option.value}
              onClick={() => {
                onToggle(option.value);
              }}
              className={`
                cursor-pointer border-[1px] border-primary focus:outline-none transition-colors duration-300
                px-[12px] py-[10px] text-[12px]
                md:px-[16px] md:py-[12px] md:text-[14px]
                ${
                  isSelected
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
    </div>
  );
};
