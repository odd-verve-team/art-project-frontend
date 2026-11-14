import type { SocialMedia } from "@/types/artist";

import InstagramIcon from '@/assets/socials/instagram-icon.svg';
import TwitterIcon from '@/assets/socials/twitter-icon.svg';
import TelegramIcon from '@/assets/socials/telegram-icon.svg';
import FacebookIcon from '@/assets/socials/facebook-icon.svg';

export const DEFAULT_AVATAR =
  'https://res.cloudinary.com/mpczkqqv/image/upload/default_avatar.png';

export const SOCIAL_LINKS_CONFIG: {
  key: keyof SocialMedia;
  placeholder: string;
  icon: string;
}[] = [
  { key: 'instagram', placeholder: 'instagram', icon: InstagramIcon },
  { key: 'twitter', placeholder: 'twitter', icon: TwitterIcon },
  { key: 'telegram', placeholder: 'telegram', icon: TelegramIcon },
  { key: 'facebook', placeholder: 'facebook', icon: FacebookIcon },
];
