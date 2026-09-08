interface Props {
  title: string,
  options: { label: string, value: string }[],
  selectedValues: string[],
  onToggle: (value: string) => void;
}

export const FilterButtonGroup = ({ title, options, selectedValues, onToggle }: Props) => {
  return (
    <div>
      <h3 className="mb-[16px]">{title}</h3>
      <div className="flex flex-wrap gap-[4px]">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);

          return (
            <button
              key={option.value}
              onClick={() => {
                onToggle(option.value);
              }}
              className={`
               cursor-pointer border-[1px] border-primary px-[10px] py-[12px]
               focus:outline-none hover:bg-gray-100 transition-colors duration-300
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