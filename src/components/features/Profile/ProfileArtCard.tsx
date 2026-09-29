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
    <div className="flex h-[216px]">
      <div
        className={`
          flex items-center justify-center p-[8px]
          w-[40%] shrink-0 border border-primary
        `}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-auto max-h-full object-contain"
        />
      </div>
      <div
        className={cn(
          `flex flex-col items-start w-full p-[8px_16px]`,
          artworkStatusMeta.bg
        )}
      >
        <div className="flex flex-col">
          <h3 className="text-primary text-[16px]/[16px] font-[500]">
            {title}
          </h3>
          <span className="text-muted text-[8px]/[10px] font-[500] tracking-[1px]">
            {date}
          </span>
        </div>
        <div className="flex flex-col gap-[12px] mt-[16px]">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex text-primary font-[300] text-[12px]"
            >
              <span className="w-[60px] shrink-0 uppercase">
                {spec.label}
              </span>
              <span className={spec.className}>{spec.value}</span>
            </div>
          ))}
        </div>
        <div className="flex mt-[auto]">
          <span className="text-primary w-[60px] font-[300] text-[10px] uppercase">
            status
          </span>
          <span className="text-primary text-[10px] font-[700] uppercase">
            {artworkStatusMeta.label}
          </span>
          <span className="ml-[5px] text-primary text-[10px] font-[700]">
            {artworkStatusMeta.icon}
          </span>
        </div>
      </div>
    </div>
  );
}