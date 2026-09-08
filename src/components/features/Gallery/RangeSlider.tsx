import type { ChangeEvent } from "react";

interface Props {
  title: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

export const RangeSlider = ({
  title, min, max, step, value, onChange,
  formatValue = (value) => value.toString(),
}: Props) => {
  const pencentage = ((value - min) / (max - min)) * 100;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(Number(e.target.value));
  };

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="">
        <h3>{title}</h3>
        <span>{formatValue(value)}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-[400px] h-[6px] cursor-pointer appearance-none outline-none"
        style={{
          background: `linear-gradient(to right, #111111 ${pencentage}%, #A4A4A4 ${pencentage}%)`,
        }}
      />

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: #111111;
          cursor: pointer;
          border: none;
        }
        input[type='range']::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #111111;
          cursor: pointer;
          border: none;
          border-radius: 0;
        }
      `}</style>
    </div>
  );
};