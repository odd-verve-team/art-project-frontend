import type { ArtistDetail, SocialMedia } from '@/types/artist';

import InstagramIcon from '@/assets/socials/instagram-icon.svg';
import TwitterIcon from '@/assets/socials/twitter-icon.svg';
import TelegramIcon from '@/assets/socials/telegram-icon.svg';
import FacebookIcon from '@/assets/socials/facebook-icon.svg';

const SOCIAL_ITEMS: { key: keyof SocialMedia; icon: string }[] = [
  { key: 'instagram', icon: InstagramIcon },
  { key: 'twitter', icon: TwitterIcon },
  { key: 'telegram', icon: TelegramIcon },
  { key: 'facebook', icon: FacebookIcon },
];

const getSocialUsername = (url: string) => {
  const cleanUrl = url.split('?')[0].replace(/\/$/, '');
  const username = cleanUrl.split('/').pop() || '';
  return `@${username}`;
};

interface Props {
  artist: ArtistDetail;
  className?: string;
}

export const ArtistContactInfo = ({ artist, className = '' }: Props) => {
  const { address, email, social_media } = artist;
  const location = [address?.city, address?.country].filter(Boolean).join(', ') || '—';

  return (
    <section
      className={`
        flex flex-col
        ${className}
      `}
    >
      <div
        className={`
          border-b border-primary -mx-global px-global
          lg:mx-0 lg:px-0
        `}
      >
        <div
          className={`
            flex flex-col gap-[12px]
            border-x border-primary p-[12px]
            text-primary text-[12px]/[24px] font-[400] tracking-[1px] uppercase
            lg:border-x-0 lg:p-[min(1.66vw,24px)]
            lg:gap-[min(0.83vw,12px)] lg:text-[min(1.11vw,16px)] lg:leading-[min(1.66vw,24px)]
          `}
        >
          <div className="flex items-center">
            <span
              className={`
                w-[100px] shrink-0 text-primary/70 font-[300]
                lg:w-[min(8.33vw,120px)]
              `}
            >
              based in
            </span>
            <span className="truncate">{location}</span>
          </div>

          {email && (
            <div className="flex items-center">
              <span
                className={`
                  w-[100px] shrink-0 text-primary/70 font-[300]
                  lg:w-[min(8.33vw,120px)]
                `}
              >
                email
              </span>
              <a
                href={`mailto:${email}`}
                className="truncate transition-opacity duration-300 hover:opacity-50"
              >
                {email}
              </a>
            </div>
          )}
        </div>
      </div>

      <div
        className={`
          border-b border-primary -mx-global px-global
          lg:mx-0 lg:px-0
        `}
      >
        <div
          className={`
            flex items-start
            border-x border-primary p-[12px]
            text-primary text-[12px]/[24px] font-[400] tracking-[1px] uppercase
            lg:border-x-0 lg:p-[min(1.66vw,24px)]
            lg:text-[min(1.11vw,16px)] lg:leading-[min(1.66vw,24px)]
          `}
        >
          <span
            className={`
              w-[100px] shrink-0 text-primary/70 font-[300]
              lg:w-[min(8.33vw,120px)]
            `}
          >
            social
          </span>

          <div
            className={`
              flex flex-col gap-[10px] min-w-0
              lg:gap-[min(0.83vw,12px)]
            `}
          >
            {SOCIAL_ITEMS.map((item) => {
              const url = social_media?.[item.key];
              if (!url) return null;

              return (
                <a
                  key={item.key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    flex items-center gap-[8px] w-fit max-w-full
                    hover:opacity-70 transition-opacity duration-300
                    lg:gap-[min(0.69vw,10px)]
                  `}
                >
                  <img
                    src={item.icon}
                    alt={item.key}
                    className={`
                      w-[14px] h-[14px] shrink-0
                      lg:w-[min(1.11vw,16px)] lg:h-[min(1.11vw,16px)]
                    `}
                  />
                  <span className="truncate">{getSocialUsername(url)}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
