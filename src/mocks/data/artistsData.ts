import type { UserProfile } from '@/types/user';
import Slide03 from '@/assets/hero-slider/slide-03.webp';

export let mockUserProfile: UserProfile = {
  first_name: 'Mary',
  last_name: 'Jayn',
  email: 'mary.jayn@gmail.com',
  phone_number: '+380501234567',
  avatar_url: Slide03,
  address: {
    country: 'Ukraine',
    city: 'Kyiv',
    postal_code: '01001',
  },
};

export const updateMockUserProfile = (data: Partial<UserProfile>) => {
  mockUserProfile = {
    ...mockUserProfile,
    ...data,
    address: data.address
      ? { ...mockUserProfile.address, ...data.address }
      : mockUserProfile.address,
  };
  return mockUserProfile;
};

export interface ArtistDetailMock {
  id: number;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  style: string | null;
  statement: string | null;
  image_url: string | null;
  address: {
    country: string;
    city: string;
  };
  social_media: {
    instagram: string | null;
    twitter: string | null;
    telegram: string | null;
    facebook: string | null;
  };
  artworks: number[];
}

export const MOCK_ARTISTS_DETAILS: Record<number, ArtistDetailMock> = {
  10: {
    id: 10,
    first_name: 'Mary',
    last_name: 'Jayn',
    bio: 'Contemporary artist working across oil and digital mediums.',
    style: 'Impressionism & Modern',
    statement: 'Capturing transient light and emotional resonance.',
    image_url: Slide03,
    address: {
      country: 'Ukraine',
      city: 'Kyiv',
    },
    social_media: {
      instagram: 'https://instagram.com/maryjayn_art',
      twitter: null,
      telegram: 'https://t.me/maryjayn',
      facebook: null,
    },
    artworks: [1, 3, 8, 14],
  },
};
