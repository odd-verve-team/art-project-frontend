import { http, HttpResponse, delay } from 'msw';
import {
  mockUserProfile,
  updateMockUserProfile,
  MOCK_ARTISTS_DETAILS,
} from '../data/artistsData';
import { MOCK_PROFILE_ARTWORKS } from '../data/profileMockData';
import type { Artwork } from '@/types/artwork';

const baseURL = import.meta.env.VITE_API_BASE_URL || '';

let artistArtworks = [...MOCK_PROFILE_ARTWORKS];

export const artistsHandlers = [
  http.get(`${baseURL}/users/profile/`, async () => {
    await delay(300);
    return HttpResponse.json(mockUserProfile, { status: 200 });
  }),

  http.patch(`${baseURL}/users/profile/`, async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as Record<string, unknown>;
    const updated = updateMockUserProfile(body);
    return HttpResponse.json(updated, { status: 200 });
  }),

  http.get(`${baseURL}/artists/profile/`, async () => {
    await delay(300);
    const artistInfo = MOCK_ARTISTS_DETAILS[10];
    return HttpResponse.json(
      {
        ...artistInfo,
        email: mockUserProfile.email,
        phone_number: mockUserProfile.phone_number,
        avatar_url: artistInfo.image_url,
      },
      { status: 200 },
    );
  }),

  http.patch(`${baseURL}/artists/profile/`, async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as Record<string, unknown>;

    const artistInfo = MOCK_ARTISTS_DETAILS[10];

    const currentProfile = {
      ...artistInfo,
      email: mockUserProfile.email,
      phone_number: mockUserProfile.phone_number,
      avatar_url: artistInfo.image_url,
    };

    const updated = { ...currentProfile, ...body };

    return HttpResponse.json(updated, { status: 200 });
  }),

  http.get(`${baseURL}/artists/artworks/`, async () => {
    await delay(300);
    return HttpResponse.json(artistArtworks, { status: 200 });
  }),

  http.post(`${baseURL}/artists/artworks/`, async ({ request }) => {
    await delay(500);

    const newArt: Artwork = {
      id: Date.now(),
      title: 'New Uploaded Artwork',
      price: '1000.00',
      category: 'landscape',
      medium: 'oil',
      painting_height: 50,
      painting_width: 50,
      image_width: 1000,
      image_height: 1000,
      image_url:
        'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800',
      status: 'pending',
      is_featured: false,
      year: 2026,
      created_at: new Date().toISOString(),
      description: 'Newly created mock artwork',
      artist: {
        id: 10,
        first_name: mockUserProfile.first_name,
        last_name: mockUserProfile.last_name,
        avatar_url: mockUserProfile.avatar_url,
      },
    };

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const title = formData.get('title') as string;
      if (title) newArt.title = title;
    }

    artistArtworks.unshift(newArt);
    return HttpResponse.json(newArt, { status: 201 });
  }),

  http.delete(`${baseURL}/artists/artworks/:id/`, async ({ params }) => {
    await delay(300);
    const id = Number(params.id);
    artistArtworks = artistArtworks.filter((art) => art.id !== id);
    return HttpResponse.json(
      { message: 'Artwork deleted successfully' },
      { status: 200 },
    );
  }),

  http.get(`${baseURL}/artists/:id/`, async ({ params }) => {
    await delay(350);
    const id = Number(params.id);
    const artist = MOCK_ARTISTS_DETAILS[id];

    if (!artist) {
      return HttpResponse.json(
        { message: 'Artist not found' },
        { status: 404 },
      );
    }

    return HttpResponse.json(artist, { status: 200 });
  }),
];
