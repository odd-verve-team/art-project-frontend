import { useEffect, useRef } from 'react';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const OtpInput = ({ value, onChange }: OtpInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const otpArray = value.split('').concat(Array(6).fill('')).slice(0, 6);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (value === '') {
      inputRefs.current[0]?.focus();
    }
  }, [value]);

  const handleClick = (index: number) => {
    const firstEmptyIndex = Math.min(value.length, 5);

    if (index > firstEmptyIndex) {
      inputRefs.current[firstEmptyIndex]?.focus();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const char = e.target.value;

    if (!/^[0-9]*$/.test(char)) return;

    const newOtpArray = [...otpArray];
    newOtpArray[index] = char;
    onChange(newOtpArray.join(''));

    if (char !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && otpArray[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-[16px]">
      {otpArray.map((char, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={char}
          onClick={() => handleClick(index)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-10 h-10 border border-black text-center text-xl focus:outline-none bg-transparent"
        />
      ))}
    </div>
  );
};
