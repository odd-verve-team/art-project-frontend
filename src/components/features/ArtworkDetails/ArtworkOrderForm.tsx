import type { SyntheticEvent } from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/utils/cn';
import type { Artwork } from '@/types/artwork';

// #region Constants & Styles
const FORM_FIELDS = [
  { name: 'fullName', type: 'text', placeholder: 'full name', required: true },
  { name: 'email', type: 'email', placeholder: 'email', required: true },
  { name: 'phone', type: 'tel', placeholder: 'phone number', required: false },
];

const INPUT_CLASS = `
  w-full pb-[2px] bg-transparent border-b border-primary 
  text-primary text-[10px] font-[500] uppercase outline-none
  focus:border-primary/50 transition-colors
  placeholder:text-muted placeholder:text-[10px] placeholder:font-[500] placeholder:tracking-[1px]
`;

const TEXTAREA_CLASS = cn(
  INPUT_CLASS,
  'min-h-[70px] p-[8px] border resize-none lg:h-full',
);
// #endregion

interface Props {
  artwork: Artwork;
  className?: string;
}

export const ArtworkOrderForm = ({ artwork, className = '' }: Props) => {
  const { id, title, image_url: image } = artwork;

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('artwork_id', id.toString());
    const data = Object.fromEntries(formData.entries());
    const params = new URLSearchParams(
      data as Record<string, string>,
    ).toString();
    window.open(`/fake-order?${params}`, '_blank');
    e.currentTarget.reset();
  };

  return (
    <section
      id="order-form"
      className={`
        flex flex-col gap-[16px] mb-[24px]
        ${className}
      `}
    >
      <div
        className={`
          flex overflow-hidden select-none
          w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]
          border-y border-primary
        `}
      >
        <motion.div
          className="flex shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 10 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`
                pr-[30px] whitespace-nowrap text-[60px]/[60px]
                lg:text-[min(4.16vw,60px)] lg:leading-[min(4.16vw,60px)]
                font-[200] tracking-[1px] uppercase
              `}
            >
              Inquiry & Order Form <span className="ml-[30px] h-full">/</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div
        className={`
          p-[12px] border border-primary
          lg:px-[24px] lg:py-[32px]
        `}
      >
        <form
          onSubmit={handleSubmit}
          className={`
            flex flex-col gap-[36px]
            lg:flex-row lg:justify-between lg:gap-[64px]
          `}
        >
          <div
            className={`
              flex flex-col gap-[32px] mt-[25px]
              lg:flex-1 lg:mt-0 lg:mr-[min(5.55vw,80px)]
            `}
          >
            {FORM_FIELDS.map((input) => (
              <div key={input.name} className="relative w-full">
                <input
                  type={input.type}
                  name={input.name}
                  required={input.required}
                  placeholder={input.placeholder}
                  className={INPUT_CLASS}
                />
                {input.required && (
                  <span className="absolute right-0 top-0 text-[24px]">*</span>
                )}
              </div>
            ))}
            <textarea
              name="message"
              placeholder="message"
              className={TEXTAREA_CLASS}
            />
          </div>

          <div
            className={`
              flex flex-col gap-[36px]
              lg:w-[min(27.77vw,400px)] lg:shrink-0 lg:justify-between lg:gap-[0px]
            `}
          >
            <div
              className={`
                flex items-end gap-[15px]
                lg:flex-col lg:items-center lg:justify-center lg:h-full lg:gap-[16px] lg:pb-[24px]
              `}
            >
              <img
                src={image}
                alt={title}
                className={`
                  w-auto h-auto object-contain max-w-[140px] max-h-[180px] 
                  lg:max-w-full lg:max-h-[min(16.66vw,240px)] lg:object-center
                `}
              />
              <span
                className={`
                  text-[12px] font-[300] shrink-0
                  lg:text-[min(1.11vw,16px)] lg:text-center
                `}
              >
                Artwork: "{title}"
              </span>
            </div>

            <button 
              type="submit" 
              className={`
                w-full py-[10px] bg-primary text-background 
                text-[16px] font-[500] uppercase tracking-[1px]
                hover:opacity-80 transition-opacity duration-300 cursor-pointer
              `}
            >
              send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
