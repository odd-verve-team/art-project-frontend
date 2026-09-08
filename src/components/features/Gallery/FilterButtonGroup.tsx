interface Props {
  title: string,
  options: { label: string, value: string }[],
  selectedValues: string[],
  onToggle: (value: string) => void;
}

export const FilterButtonGroup = ({ title, options, selectedValues, onToggle }: Props) => {
  return (
    <div className="uppercase text-primary font-[500] text-[16px]/[24px]">
      <h3 className="mb-[16px] tracking-[1px]">{title}</h3>
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
              ${
                isSelected
                  ? 'bg-primary text-background'
                  : 'bg-background text-primary'
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