import { useForm } from 'react-hook-form';

import { cn } from '@/utils/cn';
import { ProfileFormDropdown } from './ProfileFormDropdown';
import { ProfileArtUploader } from './ProfileArtUploader';

import {
  FILTER_LIMITS,
  MEDIUM_OPTIONS,
  CATEGORY_OPTIONS,
} from '../Gallery/galleryConstants';

import PencilIcon from '@/assets/pencil-icon.svg';

// #region Constants & Styles
const INPUT_GROUP = `
  group flex items-center justify-between 
  pb-[4px] border-b border-primary transition-colors duration-300
  focus-within:border-primary/50
`;

const INPUT_LABEL = `
  text-[12px] text-primary uppercase font-[400] tracking-[1px] shrink-0
`;

const NUMBER_INPUT = `
  w-[42px] h-[24px] 
  bg-transparent outline-none border border-primary transition-colors
  text-center text-primary font-[500] text-[16px]/[24px]
  focus:border-primary/50
`;

const MULTIPLIER_TEXT = `
  text-primary font-[500] text-[16px]/[24px]
`;
// #endregion

export interface NewArtFormData {
  image: FileList | null;
  title: string;
  painting_width: number;
  painting_length: number;
  year: number;
  medium: string;
  category: string;
  description: string;
  price: number;
}

export const ProfileNewArt = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isValid },
  } = useForm<NewArtFormData>({
    mode: 'onChange',
  });

  const titleValue = watch('title');
  const selectedYear = watch('year');
  const selectedMedium = watch('medium');
  const selectedCategory = watch('category');
  const currentImage = watch('image');

  const yearOptions = Array.from(
    { length: FILTER_LIMITS.MAX_YEAR - FILTER_LIMITS.MIN_YEAR + 1 },
    (_, i) => {
      const year = FILTER_LIMITS.MAX_YEAR - i;
      return { label: year, value: year };
    },
  );

  const onSubmit = (data: NewArtFormData) => {
    console.log('Form successfully submitted!');
    console.log('Data for backend:', {
      title: data.title,
      painting_width: data.painting_width,
      painting_length: data.painting_length,
      year: data.year,
      medium: data.medium,
      category: data.category,
      description: data.description,
      price: data.price,
      image: data.image ? data.image[0] : null,
    });

    reset();
  };

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.blur();
    }
    if (e.key === 'Escape') {
      e.currentTarget.blur();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const { onChange: priceOnChange, ...priceRegister } = register('price', {
    required: true,
    setValueAs: (v) => parseInt(String(v).replace(/\D/g, ''), 10) || undefined,
  });

  const { onChange: widthOnChange, ...widthRegister } = register(
    'painting_width',
    {
      required: true,
      setValueAs: (v) =>
        parseInt(String(v).replace(/\D/g, ''), 10) || undefined,
    },
  );

  const { onChange: lengthOnChange, ...lengthRegister } = register(
    'painting_length',
    {
      required: true,
      setValueAs: (v) =>
        parseInt(String(v).replace(/\D/g, ''), 10) || undefined,
    },
  );

  const { onChange: descOnChange, ...descRegister } = register('description', {
    required: true,
  });
  
  const isFormReady = isValid && currentImage;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`
        flex flex-col gap-[32px] 
        p-[16px_8px] border border-primary
      `}
    >
      <ProfileArtUploader
        currentImage={currentImage}
        onImageSelect={(fileList) =>
          setValue('image', fileList, { shouldValidate: true })
        }
      />

      <div className={INPUT_GROUP}>
        <label className={INPUT_LABEL}>
          Name
        </label>
        <input
          type="text"
          placeholder="TITLE"
          {...register('title', { required: true })}
          onKeyDown={handleInputKeyDown}
          className={`
            flex-1 ml-[16px] truncate
            bg-transparent outline-none 
            text-right text-primary font-[500] text-[16px]/[24px] 
            placeholder:text-primary/50 focus:placeholder:text-transparent
          `}
        />

        {!titleValue && (
          <img
            src={PencilIcon}
            alt="Edit"
            className="w-[12px] h-[12px] ml-[8px] pointer-events-none group-focus-within:hidden"
          />
        )}
      </div>

      <div className={INPUT_GROUP}>
        <label className={INPUT_LABEL}>
          Size
        </label>

        <div className="flex items-center justify-end gap-[6px] ml-[16px]">
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            {...widthRegister}
            onKeyDown={handleInputKeyDown}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/\D/g, '');
              widthOnChange(e);
            }}
            className={NUMBER_INPUT}
          />
          <span className={MULTIPLIER_TEXT}>×</span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            {...lengthRegister}
            onKeyDown={handleInputKeyDown}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/\D/g, '');
              lengthOnChange(e);
            }}
            className={NUMBER_INPUT}
          />
          <span className={MULTIPLIER_TEXT}>cm</span>
        </div>
      </div>

      <input type="hidden" {...register('year', { required: true })} />
      <input type="hidden" {...register('medium', { required: true })} />
      <input type="hidden" {...register('category', { required: true })} />

      <ProfileFormDropdown
        label="Year"
        value={selectedYear}
        options={yearOptions}
        onSelect={(val) =>
          setValue('year', val as number, { shouldValidate: true })
        }
      />
      <ProfileFormDropdown
        label="Medium"
        value={selectedMedium}
        options={MEDIUM_OPTIONS}
        onSelect={(val) =>
          setValue('medium', val as string, { shouldValidate: true })
        }
      />
      <ProfileFormDropdown
        label="Category"
        value={selectedCategory}
        options={CATEGORY_OPTIONS}
        onSelect={(val) =>
          setValue('category', val as string, { shouldValidate: true })
        }
      />

      <div className="flex flex-col gap-[12px]">
        <label className={INPUT_LABEL}>
          Description
        </label>
        <textarea
          {...descRegister}
          onChange={(e) => {
            descOnChange(e);
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onKeyDown={handleTextareaKeyDown}
          placeholder="CONCEPT, INSPIRATION OR ARTWORK DETAILS..."
          className={`
            w-full min-h-[120px] p-[12px_16px] 
            bg-transparent outline-none border border-primary transition-colors
            resize-none overflow-hidden
            text-primary font-[500] text-[12px]/[18px]
            focus:border-primary/50
          `}
        />
      </div>

      <div className={INPUT_GROUP}>
        <label className={INPUT_LABEL}>
          Price
        </label>

        <div className="flex flex-1 items-center justify-end ml-[16px] gap-[4px]">
          <input
            type="text"
            inputMode="numeric"
            placeholder="0"
            {...priceRegister}
            onKeyDown={handleInputKeyDown}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, '');
              e.target.value = onlyNumbers.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                '.',
              );
              priceOnChange(e);
            }}
            className={`
              w-full bg-transparent outline-none 
              text-right text-primary font-[500] text-[16px]/[24px] 
              placeholder:text-primary/50
            `}
          />
          <span className={MULTIPLIER_TEXT}>€</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isFormReady}
        className={cn(
          `w-full mt-[16px] py-[14px] text-[14px] font-[500] tracking-[1px] uppercase transition-all duration-300`,
          isFormReady
            ? 'bg-primary text-background cursor-pointer hover:opacity-80'
            : 'bg-primary/50 text-background/80 cursor-not-allowed'
        )}
      >
        Submit for approval
      </button>
    </form>
  );
};
