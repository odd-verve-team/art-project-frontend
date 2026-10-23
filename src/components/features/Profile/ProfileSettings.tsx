import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

import { cn } from '@/utils/cn';

import type { UserDetail } from '@/types/user';
import type { ArtworkCategory } from '@/types/artwork';
import { CATEGORY_OPTIONS } from '../Gallery/galleryConstants';

import ImageIcon from '@/assets/image-icon.svg';
import InstagramIcon from '@/assets/socials/instagram-icon.svg';
import TelegramIcon from '@/assets/socials/telegram-icon.svg';
import TwitterIcon from '@/assets/socials/twitter-icon.svg';
import FacebookIcon from '@/assets/socials/facebook-icon.svg';

// #region Constants & Styles
const PERSONAL_FIELDS = [
  {
    name: 'first_name',
    type: 'text',
    placeholder: 'name',
    required: true,
    disabled: false,
  },
  {
    name: 'last_name',
    type: 'text',
    placeholder: 'second name',
    required: true,
    disabled: false,
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'email',
    required: true,
    disabled: true,
  },
  {
    name: 'phone',
    type: 'tel',
    placeholder: 'phone number',
    required: false,
    disabled: false,
  },
];

const ADDRESS_FIELDS = [
  { name: 'country', type: 'text', label: 'country' },
  { name: 'city', type: 'text', label: 'city' },
  { name: 'postal_code', type: 'text', label: 'postal code' },
];

const ARTIST_TEXT_FIELDS = [
  {
    name: 'about',
    label: 'about you',
    placeholder: 'tell us about yourself...',
  },
  {
    name: 'statement',
    label: 'your statement',
    placeholder: 'your artist statement...',
  },
  { name: 'style', label: 'your style', placeholder: 'describe your style...' },
];

const SOCIAL_FIELDS = [
  { name: 'instagram', placeholder: 'instagram', icon: InstagramIcon },
  { name: 'telegram', placeholder: 'telegram', icon: TelegramIcon },
  { name: 'twitter', placeholder: 'twitter', icon: TwitterIcon },
  { name: 'facebook', placeholder: 'facebook', icon: FacebookIcon },
];

const TEXT_BASE = `
  text-[12px]/[24px] font-[500] tracking-[1px] uppercase
  md:text-[13px]/[24px]
  lg:text-[14px]/[24px]
`;

const INPUT_CLASS = cn(
  TEXT_BASE,
  'w-full pb-[2px] bg-transparent border-b border-primary text-primary outline-none',
  'placeholder:text-muted focus:border-primary/50 transition-colors duration-300',
);

const TEXTAREA_CLASS = cn(
  INPUT_CLASS,
  'p-[12px_24px] pb-[12px] border border-muted resize-none overflow-hidden font-[300]',
  'focus:border-primary hover:border-primary',
);

const CATEGORY_BTN_BASE = cn(
  TEXT_BASE,
  'font-[300] p-[5px_15px] lg:p-[8px_20px] border outline-none cursor-pointer transition-colors duration-300',
);

const BOX_CONTAINER_CLASS =
  'flex flex-col gap-[20px] p-[24px] border border-muted';
const ACTION_BUTTON_BASE =
  'w-full uppercase tracking-[1px] transition-opacity duration-500 ease-in-out cursor-pointer';
//#endregion

export const ProfileSettings = () => {
  const { user } = useOutletContext<{user: UserDetail | null}>();

  const [isArtistForm, setIsArtistForm] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<ArtworkCategory[]>([]);

  if (!user) return null;

  const { avatar_url: image } = user;

  //! DELETE MOCKDATA in future
  const mockAddressData: Record<string, string> = {
    country: 'Ukraine',
    city: 'Kyiv',
    postal_code: '01001',
  };
  //! DELETE MOCKDATA in future

  const handleCategoryToggle = (category: ArtworkCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <section id="profile-settings">
      <form className="border border-b-0 border-primary lg:border-none">
        <div className="flex flex-col gap-[32px] lg:gap-[40px]">
          <div
            className={`
              flex flex-col gap-[32px]
              lg:flex-row lg:justify-between lg:items-start lg:gap-[64px]
            `}
          >
            <div
              className={`
                order-1 flex justify-center mt-[30px]
                lg:order-2 lg:mt-0 lg:shrink-0
              `}
            >
              <div
                className={`
                  flex items-center justify-center
                  border border-primary p-[16px] w-[162px] h-[186px]
                  md:w-[220px] md:h-[250px] md:p-[20px]
                  lg:w-[320px] lg:h-[360px] lg:p-[24px]
                `}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={ImageIcon} alt="No Avatar" />
                )}
              </div>
            </div>

            <div
              className={`
                order-2 flex flex-col gap-[32px]
                lg:order-1 lg:flex-1 lg:max-w-[600px]
              `}
            >
              <div className="flex flex-col gap-[24px] px-[8px] md:px-[24px] lg:px-0">
                {PERSONAL_FIELDS.map((input) => {
                  const value = user[input.name as keyof UserDetail];
                  const isEmail = input.name === 'email';

                  return (
                    <div key={input.name} className="relative w-full">
                      <input
                        type={input.type}
                        name={input.name}
                        placeholder={input.placeholder}
                        defaultValue={value ? String(value) : ''}
                        className={cn(
                          INPUT_CLASS,
                          input.disabled && 'opacity-70 cursor-not-allowed',
                        )}
                        disabled={input.disabled}
                      />
                      {isEmail ? (
                        <span className="absolute right-0 bottom-[2px] text-[12px]">
                          ✓
                        </span>
                      ) : input.required ? (
                        <span className="absolute right-0 top-0 text-[24px]">
                          *
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-[8px] px-[8px] md:px-[24px] lg:px-0">
                <span className={TEXT_BASE}>address</span>
                <div className={BOX_CONTAINER_CLASS}>
                  {ADDRESS_FIELDS.map((field) => {
                    const value = mockAddressData[field.name];

                    return (
                      <div
                        key={field.name}
                        className="flex justify-between items-end border-b border-muted border-dotted pb-[2px]"
                      >
                        <input
                          type={field.type}
                          name={field.name}
                          defaultValue={value ? String(value) : ''}
                          className={cn(INPUT_CLASS, 'border-none pb-0')}
                        />
                        <span
                          className={cn(
                            TEXT_BASE,
                            'text-muted whitespace-nowrap shrink-0 ml-[20px]',
                          )}
                        >
                          {field.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {isArtistForm && (
            <div className="flex flex-col gap-[24px] px-[8px] md:px-[24px] lg:px-0 lg:gap-[32px]">
              {ARTIST_TEXT_FIELDS.map((field) => (
                <div key={field.name} className="flex flex-col gap-[12px]">
                  <span className={TEXT_BASE}>{field.label}</span>
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    onInput={handleTextareaInput}
                    className={TEXTAREA_CLASS}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-[12px]">
                <span className={TEXT_BASE}>category</span>
                <div className="flex flex-wrap gap-[8px]">
                  {CATEGORY_OPTIONS.map((option) => {
                    const isSelected = selectedCategories.includes(
                      option.value,
                    );

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleCategoryToggle(option.value)}
                        className={cn(
                          CATEGORY_BTN_BASE,
                          isSelected
                            ? 'bg-primary text-background hover:opacity-70'
                            : 'bg-background text-primary hover:bg-gray-100',
                        )}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-[16px] lg:max-w-[600px]">
                <span className={TEXT_BASE}>social</span>
                <div className="flex flex-col gap-[24px]">
                  {SOCIAL_FIELDS.map((social) => (
                    <div
                      key={social.name}
                      className="relative flex items-center w-full"
                    >
                      <input
                        type="text"
                        name={social.name}
                        placeholder={social.placeholder}
                        className={cn(INPUT_CLASS, 'pr-[28px]')}
                      />
                      <img
                        src={social.icon}
                        alt={social.name}
                        className="absolute right-0 bottom-[6px] w-[16px] h-[16px] pointer-events-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div
            className={`
              flex flex-col gap-[10px]
              lg:w-[320px] lg:ml-auto
            `}
          >
            {!isArtistForm && (
              <button
                type="button"
                onClick={() => setIsArtistForm(true)}
                className={cn(
                  ACTION_BUTTON_BASE,
                  'text-[14px] font-[500] hover:opacity-70',
                )}
              >
                To become an artist
              </button>
            )}

            <button
              type="submit"
              className={cn(
                ACTION_BUTTON_BASE,
                'bg-primary text-background py-[10px] text-[16px] font-[600] hover:opacity-70',
              )}
            >
              {isArtistForm ? 'Submit for approval' : 'Save'}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
