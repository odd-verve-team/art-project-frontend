export type HeaderTheme = 'dark' | 'light';

export const NAV_ITEMS = [
  { label: 'home', path: '/' },
  { label: 'about', path: '/#about' },
  { label: 'gallery', path: '/gallery' },
  { label: 'profile', path: '/profile' },
];

export const PROFILE_TABS = [
  { name: 'Favorites', href: '/profile/favorites' },
  { name: 'My Arts', href: '/profile/arts', artistOnly: true },
  { name: 'Profile Settings', href: '/profile/settings' },
  { name: 'Preferences & Notifications', href: '/profile/notifications' },
];

export const FOOTER_SOCIAL_ITEMS = [
  { label: 'facebook', url: '1' },
  { label: 'instagram', url: '2' },
  { label: 'youtube', url: '3' },
];
