import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

import { cn } from '@/utils/cn';

import type { UserDetail } from '@/types/user';
import type { ArtworkCategory } from '@/types/artwork';
import { CATEGORY_OPTIONS } from '../Gallery/galleryConstants';

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

const TEXT_BASE = 'text-[12px]/[24px] font-[500] tracking-[1px] uppercase';

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
  'font-[300] p-[5px_15px] border outline-none cursor-pointer transition-colors duration-300',
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
      <form className="border border-b-0 border-primary">
        <div className="flex flex-col gap-[32px]">
          <div className="flex justify-center mt-[30px]">
            <div className="border border-primary p-[16px] w-[162px] h-[186px]">
              <img
                src={image}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[24px] px-[8px]">
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

          <div className="flex flex-col gap-[8px] px-[8px]">
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

          {isArtistForm && (
            <div className="flex flex-col gap-[24px] px-[8px]">
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
            </div>
          )}

          <div className="flex flex-col gap-[10px]">
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
