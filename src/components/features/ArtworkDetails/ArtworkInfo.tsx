import type { Artwork } from '@/types/artwork';
import EuroIcon from '@/assets/euro_icon.svg';

interface Props {
  artwork: Artwork;
  className?: string;
}

export const ArtworkInfo = ({ artwork, className = '' }: Props) => {
  const size = `${artwork.painting_length}x${artwork.painting_width} cm`;
  const price = Number(artwork.price).toLocaleString('de-DE');

  const specs = [
    {
      label: 'size',
      value: size,
    },
    {
      label: 'year',
      value: artwork.year,
    },
    {
      label: 'medium',
      value: artwork.medium,
      className: 'first-letter:uppercase',
    },
    {
      label: 'artist',
      value: `${artwork.artist.first_name} ${artwork.artist.last_name}`,
      className: 'font-[700] uppercase',
    },
  ];

  const scrollToForm = () => {
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      className={`
        border-b border-primary -mx-global px-global
        lg:mx-0 lg:px-0
        ${className}
      `}
    >
      <div
        className={`
          flex flex-col justify-center h-full
          border-x border-primary p-[12px]
          lg:border-x-0 lg:justify-start lg:px-[24px] lg:py-[16px]
        `}
      >
        <span
          className={`
            hidden
            lg:block lg:text-muted lg:text-[16px] lg:font-[300] lg:uppercase lg:mb-[20px]
          `}
        >
          about
        </span>

        <div
          className={`
            flex flex-col gap-[16px]
            lg:gap-[24px]
          `}
        >
          {specs.map((spec) => (
            <div 
              key={spec.label}
              className={`
                flex text-primary font-[300] text-[16px]
                lg:text-[24px]
              `}
            >
              <span 
                className={`
                  w-[80px] uppercase
                  lg:w-[120px]
                `}
              >
                {spec.label}
              </span>
              <span className={spec.className}>{spec.value}</span>
            </div>
          ))}
        </div>

        <div 
          className={`
            flex items-center justify-between
            mt-[22px] mb-[12px]
            lg:mt-auto lg:mb-[0px]
          `}
        >
          <div className="flex items-center text-primary">
            <span 
              className={`
                font-[300] uppercase w-[80px] text-[16px]
                lg:text-[24px] lg:w-[120px]
              `}
            >
              price
            </span>
            <span className="flex items-center gap-[4px] text-[24px] font-[600]">
              {price}
              <img src={EuroIcon} alt="Euro" />
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToForm}
            className={`
              bg-primary text-background p-[10px_45px_10px_45px]
              text-[16px]/[24px] font-[500] tracking-[1px] uppercase
              hover:opacity-80 transition-opacity duration-300 cursor-pointer
              lg:p-[10px_27px_10px_27px]
            `}
          >
            buy
          </button>
        </div>
      </div>
    </section>
  );
};
