import { http, HttpResponse, delay } from 'msw';
import { MOCK_ARTWORKS } from '../data/artworksData';
import { MOCK_ARTISTS_DETAILS } from '../data/artistsData';
import type { ArtworksResponse, ArtworkDetail } from '@/types/artwork';

const baseURL = import.meta.env.VITE_API_BASE_URL || '';

export const artworksHandlers = [
  http.get(`${baseURL}/artworks/search/`, async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const query = url.searchParams.get('text')?.trim().toLowerCase() || '';

    if (!query) {
      return HttpResponse.json([], { status: 200 });
    }

    const filtered = MOCK_ARTWORKS.filter((art) => {
      const matchTitle = art.title.toLowerCase().includes(query);
      const matchFirstName = art.artist.first_name
        ?.toLowerCase()
        .includes(query);
      const matchLastName = art.artist.last_name?.toLowerCase().includes(query);
      return matchTitle || matchFirstName || matchLastName;
    }).slice(0, 4);

    return HttpResponse.json(filtered, { status: 200 });
  }),

  http.get(`${baseURL}/artworks/:id/`, async ({ params }) => {
    await delay(250);
    const id = Number(params.id);
    const artwork = MOCK_ARTWORKS.find((item) => item.id === id);

    if (!artwork) {
      return HttpResponse.json(
        { message: 'Artwork not found' },
        { status: 404 },
      );
    }

    const artistDetail = artwork.artist?.id
      ? MOCK_ARTISTS_DETAILS[artwork.artist.id]
      : undefined;

    const detailedArtwork: ArtworkDetail = {
      ...artwork,
      artist: {
        ...artwork.artist,
        bio:
          artistDetail?.bio ??
          'Passionate visual artist exploring contemporary mediums and forms.',
        art_categories: [artwork.category, 'modern'],
      },
    };

    return HttpResponse.json(detailedArtwork, { status: 200 });
  }),

  http.get(`${baseURL}/artworks/`, async ({ request }) => {
    await delay(350);
    const url = new URL(request.url);

    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(url.searchParams.get('limit')) || 12);
    const status = url.searchParams.get('status') || 'approved';
    const isFeatured = url.searchParams.get('is_featured');
    const category = url.searchParams.get('category');
    const medium = url.searchParams.get('medium');
    const priceLte = url.searchParams.get('price_lte');
    const yearLte = url.searchParams.get('year_lte');
    const sort = url.searchParams.get('sort');

    let result = [...MOCK_ARTWORKS];

    if (status) {
      result = result.filter(
        (art) => art.status.toLowerCase() === status.toLowerCase(),
      );
    }

    if (isFeatured !== null && isFeatured !== undefined) {
      const isBool = isFeatured === 'true';
      result = result.filter((art) => art.is_featured === isBool);
    }

    if (category) {
      result = result.filter(
        (art) => art.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (medium) {
      result = result.filter(
        (art) => art.medium.toLowerCase() === medium.toLowerCase(),
      );
    }

    if (priceLte) {
      const maxPrice = Number(priceLte);
      result = result.filter((art) => Number(art.price) <= maxPrice);
    }

    if (yearLte) {
      const maxYear = Number(yearLte);
      result = result.filter((art) => art.year <= maxYear);
    }

    if (sort) {
      result.sort((a, b) => {
        switch (sort) {
          case 'price_asc':
            return Number(a.price) - Number(b.price);
          case 'price_desc':
            return Number(b.price) - Number(a.price);
          case 'year_asc':
            return a.year - b.year;
          case 'year_desc':
            return b.year - a.year;
          case 'date_asc':
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          case 'date_desc':
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          default:
            return 0;
        }
      });
    }

    const total = result.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const offset = (page - 1) * limit;
    const paginatedData = result.slice(offset, offset + limit);

    const responsePayload: ArtworksResponse = {
      data: paginatedData,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };

    return HttpResponse.json(responsePayload, { status: 200 });
  }),
];
