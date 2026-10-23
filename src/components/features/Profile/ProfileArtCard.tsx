import { getArtworkStatusMeta } from "@/utils/getArtworkStatusMeta";
import { cn } from "@/utils/cn";

import type { Artwork } from "@/types/artwork";

interface Props {
  artwork: Artwork,
  artistName: string,
}

export const ProfileArtCard = ({ artwork, artistName }: Props) => {
  const {
    image_url: image,
    title,
    year,
    medium,
    status,
    created_at,
    image_width,
    image_height,
  } = artwork;

  const size = `${image_width}x${image_height} cm`;
  const date = created_at
    ? new Date(created_at).toLocaleDateString('en-GB')
    : 'xx/xx/xxxx';
    
  const specs = [
    { label: 'size', value: size },
    { label: 'year', value: year },
    { label: 'medium', value: medium, className: 'first-letter:uppercase'},
    { label: 'artist', value: artistName, className: 'font-[700] uppercase' },
  ];

  const artworkStatusMeta = getArtworkStatusMeta(status);

  return (
    <div
      className={`
        flex h-[216px]
        md:h-[min(37.5vw,540px)]
      `}
    >
      <div
        className={`
          flex items-center justify-center shrink-0 border border-primary
          w-[50%] p-[8px]
          md:w-[min(27.77vw,400px)] md:p-[16px]
          lg:p-[24px]
        `}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      <div
        className={cn(
          `flex flex-col items-start w-full`,
          `p-[8px_16px] md:p-[12px_24px] lg:p-[16px_24px_24px_40px]`,
          artworkStatusMeta.bg
        )}
      >
        <div
          className={`
            flex flex-col w-full
            md:flex-row md:justify-between md:items-start md:gap-[16px]
          `}
        >
          <h3
            className={`
              text-primary font-[500]
              text-[16px]/[16px]
              md:text-[22px]/[26px]
              lg:text-[28px]/[32px]
              xl:text-[36px]/[40px]
            `}
          >
            {title}
          </h3>
          <span
            className={`
              text-muted font-[500] tracking-[1px] shrink-0
              text-[8px]/[10px]
              md:text-[10px]/[16px]
              lg:text-[12px]/[20px]
              xl:text-[14px]/[24px]
            `}
          >
            {date}
          </span>
        </div>
        <div
          className={`
            flex flex-col
            gap-[12px] mt-[16px]
            md:gap-[10px] md:mt-[16px]
            lg:gap-[14px] lg:mt-[20px]
            xl:gap-[20px] xl:mt-[32px]
          `}
        >
          {specs.map((spec) => (
            <div
              key={spec.label}
              className={`
                flex text-primary font-[300]
                text-[12px]
                md:text-[14px]/[18px]
                lg:text-[18px]/[22px]
                xl:text-[24px]/[28px]
              `}
            >
              <span
                className={`
                  shrink-0 uppercase
                  w-[60px]
                  md:w-[75px]
                  lg:w-[95px]
                  xl:w-[120px]
                `}
              >
                {spec.label}
              </span>
              <span className={spec.className}>{spec.value}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center mt-[auto]">
          <span
            className={`
              text-primary font-[300] uppercase
              w-[60px] text-[10px]
              md:w-[75px] md:text-[11px]
              lg:w-[95px] lg:text-[12px]
              xl:w-[120px] xl:text-[14px]
            `}
          >
            status
          </span>
          <span
            className={`
              text-primary font-[700] uppercase
              text-[10px]
              md:text-[11px]
              lg:text-[12px]
              xl:text-[14px]
            `}
          >
            {artworkStatusMeta.label}
          </span>
          <span
            className={`
              ml-[5px] text-primary font-[700]
              text-[10px]
              md:text-[11px]
              lg:text-[12px]
              xl:text-[14px]
            `}
          >
            {artworkStatusMeta.icon}
          </span>
        </div>
      </div>
    </div>
  );
}