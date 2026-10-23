import type { UserDetail } from '@/types/user';
import type { Artwork } from '@/types/artwork';

import Slide01 from '@/assets/hero-slider/slide-01.webp';
import Slide03 from '@/assets/hero-slider/slide-03.webp';
import Slide05 from '@/assets/hero-slider/slide-05.webp';
import Slide08 from '@/assets/hero-slider/slide-08.webp';
import HorizontalMountainArt from '@/assets/mock-horizontal-artwork.svg';
import ManifestoArt5 from '@/assets/manifesto/manifesto-art-5.webp';

export interface ProfileNotification {
  id: number;
  date: string;
  title: string;
  content?: string;
}

export const MOCK_PROFILE_USER: UserDetail & { phone?: string } = {
  id: 10,
  username: 'mary_jayn',
  first_name: 'Mary',
  last_name: 'Jayn',
  email: 'mary.jayn@gmail.com',
  phone: '+380 99 123 45 67',
  avatar_url: Slide03,
  role: 'artist',
  bio: 'Contemporary visual artist exploring stillness, light, and architectural form.',
  artworks: [101, 102, 103, 104, 105, 106],
  art_categories: ['modern', 'landscape', 'impressionism', 'portrait'],
  last_login: '2026-10-22T12:00:00Z',
  is_superuser: false,
  is_staff: false,
  is_active: true,
  date_joined: '2025-05-12T10:00:00Z',
  created_at: '2025-05-12T10:00:00Z',
  application_status: 'approved',
  number_of_paid_cell: 5,
  groups: [],
  user_permissions: [],
};

const MOCK_ARTIST = {
  id: MOCK_PROFILE_USER.id,
  first_name: MOCK_PROFILE_USER.first_name,
  last_name: MOCK_PROFILE_USER.last_name,
  avatar_url: MOCK_PROFILE_USER.avatar_url,
};

export const MOCK_PROFILE_ARTWORKS: Artwork[] = [
  {
    id: 101,
    title: 'Shadow of Stillness',
    image_url: Slide01,
    image_width: 80,
    image_height: 80,
    painting_width: 80,
    painting_length: 80,
    price: '1200',
    artist: MOCK_ARTIST,
    description: 'An exploration of quiet contemplation on a sunlit hill.',
    category: 'landscape',
    status: 'approved',
    is_featured: true,
    created_at: '2026-10-12T14:30:00Z',
    year: 2025,
    medium: 'oil',
  },
  {
    id: 102,
    title: 'Intersection of Forms',
    image_url: HorizontalMountainArt,
    image_width: 120,
    image_height: 70,
    painting_width: 120,
    painting_length: 70,
    price: '950',
    artist: MOCK_ARTIST,
    description: 'Distant mountain peaks under a deep cobalt sky.',
    category: 'landscape',
    status: 'pending',
    is_featured: true,
    created_at: '2026-10-12T10:15:00Z',
    year: 2025,
    medium: 'oil',
  },
  {
    id: 103,
    title: 'Silent Horizon',
    image_url: Slide05,
    image_width: 70,
    image_height: 90,
    painting_width: 70,
    painting_length: 90,
    price: '1450',
    artist: MOCK_ARTIST,
    description: 'Warm coastal horizon with figures in motion.',
    category: 'impressionism',
    status: 'pending',
    is_featured: true,
    created_at: '2026-09-28T09:00:00Z',
    year: 2024,
    medium: 'acrylic',
  },
  {
    id: 104,
    title: 'Urban Crossing',
    image_url: Slide08,
    image_width: 80,
    image_height: 100,
    painting_width: 80,
    painting_length: 100,
    price: '800',
    artist: MOCK_ARTIST,
    description: 'Graphic study of movement and shadows across city lines.',
    category: 'modern',
    status: 'rejected',
    is_featured: false,
    created_at: '2026-09-15T18:20:00Z',
    year: 2025,
    medium: 'graphics',
  },
  {
    id: 105,
    title: 'The Static Within',
    image_url: Slide03,
    image_width: 60,
    image_height: 80,
    painting_width: 60,
    painting_length: 80,
    price: '1100',
    artist: MOCK_ARTIST,
    description: 'Expressive charcoal and graphite portrait study.',
    category: 'portrait',
    status: 'sold',
    is_featured: true,
    created_at: '2026-08-20T11:45:00Z',
    year: 2024,
    medium: 'graphics',
  },
  {
    id: 106,
    title: 'Geometric Equilibrium',
    image_url: ManifestoArt5,
    image_width: 100,
    image_height: 70,
    painting_width: 100,
    painting_length: 70,
    price: '1600',
    artist: MOCK_ARTIST,
    description: 'Abstract composition balancing warm ochre and cool blue planes.',
    category: 'abstractionism',
    status: 'approved',
    is_featured: true,
    created_at: '2026-07-05T16:00:00Z',
    year: 2025,
    medium: 'mixed_media',
  },
];

export const MOCK_PROFILE_NOTIFICATIONS: ProfileNotification[] = [
  {
    id: 1,
    date: '12/07',
    title: 'MARY ARTWORK SHIPPED: YOUR ORDER HAS BEEN DISPATCHED',
  },
  {
    id: 2,
    date: '01/10',
    title:
      'INQUIRY ANSWERED: THE CURATOR HAS RESPONDED TO YOUR REQUEST REGARDING "THE SHADOW OF STILLNESS".',
    content:
      'THANK YOU FOR YOUR INTEREST IN THE SHADOW OF STILLNESS. OUR CURATOR HAS REVIEWED YOUR REQUEST AND PROVIDED THE FULL ARTWORK DETAILS, HIGH-RESOLUTION VISUAL DOCUMENTATION, AND CURRENT SHIPPING ESTIMATES.',
  },
  {
    id: 3,
    date: '21/04',
    title: 'MARY ARTWORK SHIPPED: YOUR ORDER HAS BEEN DISPATCHED',
  },
  {
    id: 4,
    date: '21/03',
    title: 'ARTIST HAS JUST BEEN LISTED IN OUR NEW CURATED COLLECTION',
  },
];
