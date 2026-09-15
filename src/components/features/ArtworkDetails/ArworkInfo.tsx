import type { Artwork } from '@/types/artwork';
import EuroIcon from '@/assets/euro_icon.svg';

interface Props {
    artwork: Artwork;
    className?: string;
}

export const ArtworkInfo = ({ artwork, className }: Props) => {
    const size = `${artwork.painting_length}x${artwork.painting_width} cm`;
    const price = Number(artwork.price).toLocaleString('de-DE');

    const specs = [
    { 
        label: 'size',
        value: size,
    },
    { 
        label: 'year', 
        value: artwork.year
    },
    { 
        label: 'medium',
        value: artwork.medium,
        className: 'first-letter:uppercase'
    },
    { 
        label: 'artist', 
        value: `${artwork.artist.first_name} ${artwork.artist.last_name}`, 
        className: 'font-[700] uppercase'
    },
];

    return (
        <div className={`-mx-global px-global border-b border-primary ${className}`}>
            <div className="h-full border-x border-primary flex flex-col justify-center p-[12px]">
                <div className="flex flex-col gap-[16px] text-primary font-[300]">
                    {specs.map((spec) => (
                        <div key={spec.label} className="flex">
                            <span
                                className="w-[80px] uppercase"
                            >
                                {spec.label}
                            </span>
                            <span
                                className={spec.className}
                            >
                                {spec.value}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between mt-[22px] mb-[12px]">
                    <div className="flex items-center text-primary">
                        <span className="text-[16px] font-[300] uppercase w-[80px]">
                            price
                        </span>
                        <span 
                            className={`
                                flex items-center gap-[4px]
                                text-[24px] font-[600]
                            `}
                        >
                            {price}
                            <img src={EuroIcon} alt="Euro"/>
                        </span>
                    </div>
                    <button
                        type="button"
                        className={`
                            bg-primary text-background p-[10px_45px_10px_45px]
                            text-[16px]/[24px] font-[500] tracking-[1px] uppercase
                            hover:opacity-80 transition-color duration-300
                        `}
                    >
                        buy
                    </button>
                </div>
            </div>
        </div>
    )
}