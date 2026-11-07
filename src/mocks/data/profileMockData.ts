import type { UserDetail, UserProfile } from '@/types/user';
import type { Artist, Artwork } from '@/types/artwork';

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

export const MOCK_PROFILE_USER: UserDetail = {
  id: '10',
  email: 'mary.jayn@gmail.com',
  role: 'artist',
  application_status: 'approved',
};

// Empty profile, as the backend returns it right after the first login
export const MOCK_USER_PROFILE: UserProfile = {
  first_name: null,
  last_name: null,
  email: 'mary.jayn@gmail.com',
  phone_number: null,
  avatar_url: null,
};

const MOCK_ARTIST: Artist = {
  id: 10,
  first_name: 'Mary',
  last_name: 'Jayn',
  avatar_url: Slide03,
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
