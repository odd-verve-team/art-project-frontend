import type { UserProfile } from '@/types/user';
import type { ArtistArtworkMin, ArtistDetail } from '@/types/artist';
import { MOCK_ARTWORKS } from './artworksData';

const getArtistMockArtworks = (artistId: number): ArtistArtworkMin[] =>
  MOCK_ARTWORKS.filter((art) => art.artist.id === artistId).map((art) => ({
    id: art.id,
    title: art.title,
    image_url: art.image_url,
    image_width: art.image_width,
    image_height: art.image_height,
    artist: {
      id: art.artist.id,
      first_name: art.artist.first_name,
      last_name: art.artist.last_name,
      avatar_url: art.artist.avatar_url,
    },
  }));

export const MOCK_ARTISTS_DETAILS: Record<number, ArtistDetail> = {
  10: {
    id: 10,
    first_name: 'Mary',
    last_name: 'Jayn',
    bio: 'Contemporary artist working across oil and digital mediums.',
    style: 'Impressionism & Modern',
    statement: 'Capturing transient light and emotional resonance.',
    image_url:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    email: 'mary.jayn@gmail.com',
    created_at: '2025-01-15T10:00:00Z',
    art_categories: ['landscape', 'portrait', 'modern'],
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
    artworks: getArtistMockArtworks(10),
  },
  11: {
    id: 11,
    first_name: 'Arthur',
    last_name: 'Pendleton',
    bio: 'Focuses on sharp angles converging into calm neutral tones.',
    style: 'Cubism & Surrealism',
    statement: 'Exploring the geometry of memory.',
    image_url:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=600&q=80',
    email: 'arthur.p@studio.com',
    created_at: '2024-11-20T14:30:00Z',
    art_categories: ['cubism', 'surrealism'],
    address: {
      country: 'UK',
      city: 'London',
    },
    social_media: {
      instagram: 'https://instagram.com/arthur_pendleton_art',
      twitter: 'https://x.com/apendleton_studio',
      telegram: null,
      facebook: null,
    },
    artworks: getArtistMockArtworks(11),
  },
  12: {
    id: 12,
    first_name: 'Elena',
    last_name: 'Rostova',
    bio: 'Specializes in warm coastal horizons and still life.',
    style: 'Impressionism',
    statement: 'Light is the only true subject.',
    image_url:
      'https://images.unsplash.com/photo-1546689241-ba21ab8c5d2e?auto=format&fit=crop&w=600&q=80',
    email: 'elena.art@rostova.com',
    created_at: '2025-03-10T09:15:00Z',
    art_categories: ['impressionism', 'still_life'],
    address: {
      country: 'Bulgaria',
      city: 'Sofia',
    },
    social_media: {
      instagram: 'https://instagram.com/elena.rostova.art',
      twitter: null,
      telegram: null,
      facebook: 'https://facebook.com/elenarostova.gallery',
    },
    artworks: getArtistMockArtworks(12),
  },
  13: {
    id: 13,
    first_name: 'Danylo',
    last_name: 'Kravets',
    bio: 'Graphic artist capturing urban movement.',
    style: 'Modern & Lithography',
    statement: 'The city never stops moving, and neither does the ink.',
    image_url:
      'https://images.unsplash.com/photo-1509635214689-98ef31ec7e82?auto=format&fit=crop&w=600&q=80',
    email: 'dkravets@mail.ua',
    created_at: '2026-01-05T16:45:00Z',
    art_categories: ['modern'],
    address: {
      country: 'Ukraine',
      city: 'Lviv',
    },
    social_media: {
      instagram: null,
      twitter: 'https://x.com/dkravets_ink',
      telegram: 'https://t.me/dkravets_art',
      facebook: null,
    },
    artworks: getArtistMockArtworks(13),
  },
  14: {
    id: 14,
    first_name: 'Sophia',
    last_name: 'Vane',
    bio: 'Experimental mixed media and watercolor painter.',
    style: 'Abstractionism & Romanticism',
    statement: 'Blurring the lines between identity and nature.',
    image_url:
      'https://images.unsplash.com/photo-1417436026361-a033044d901f?auto=format&fit=crop&w=600&q=80',
    email: 'contact@sophiavane.com',
    created_at: '2023-08-22T11:00:00Z',
    art_categories: ['abstractionism', 'romanticism'],
    address: {
      country: 'USA',
      city: 'New York',
    },
    social_media: {
      instagram: 'https://instagram.com/sophiavane.studio',
      twitter: 'https://x.com/sophiavane_art',
      telegram: null,
      facebook: 'https://facebook.com/sophiavaneart',
    },
    artworks: getArtistMockArtworks(14),
  },
  15: {
    id: 15,
    first_name: 'Taras',
    last_name: 'Melnyk',
    bio: 'Acrylic and oil painter exploring expansive landscapes and pop art.',
    style: 'Pop Art & Landscape',
    statement: 'Colors that speak louder than words.',
    image_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    email: 't.melnyk.art@gmail.com',
    created_at: '2024-05-18T13:20:00Z',
    art_categories: ['pop_art', 'landscape'],
    address: {
      country: 'Ukraine',
      city: 'Odesa',
    },
    social_media: {
      instagram: 'https://instagram.com/taras.melnyk.art',
      twitter: null,
      telegram: 'https://t.me/tarasmelnyk_studio',
      facebook: null,
    },
    artworks: getArtistMockArtworks(15),
  },
};

export let mockUserProfile: UserProfile = {
  first_name: 'Mary',
  last_name: 'Jayn',
  email: 'mary.jayn@gmail.com',
  phone_number: '+380501234567',
  avatar_url: MOCK_ARTISTS_DETAILS[10].image_url,
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
