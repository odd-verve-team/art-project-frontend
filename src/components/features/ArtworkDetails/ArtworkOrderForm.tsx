import { useState, type SyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { notificationsApi } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';

import type { Artwork } from '@/types/artwork';
import { cn } from '@/utils/cn';

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
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { id, title, image_url: image } = artwork;

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login', { state: { from: `${location.pathname}#order-form` } });
      return;
    }

    const form = e.currentTarget;
    setIsSubmitting(true);
    setIsSuccess(false);
    setErrorMessage(null);

    try {
      await notificationsApi.buyArtwork(id);
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'Failed to send purchase request'
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
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
                  disabled={isSubmitting}
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
              disabled={isSubmitting}
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

            <div className="flex flex-col gap-[10px] w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-[10px] bg-primary text-background 
                  text-[16px] font-[500] uppercase tracking-[1px]
                  hover:opacity-80 transition-opacity duration-300 cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {isSubmitting ? 'sending...' : 'send'}
              </button>

              {isSuccess && (
                <p className="text-[12px] uppercase tracking-wide font-[400] text-center">
                  Request sent! The artist has been notified.
                </p>
              )}

              {errorMessage && (
                <p className="text-[12px] text-red-500 font-[400] text-center">
                  {`${errorMessage}.`}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
