import { http, HttpResponse, delay } from 'msw';
import { MOCK_ARTWORKS } from '../data/artworksData';

const baseURL = import.meta.env.VITE_API_BASE_URL || '';

const favoriteArtworkIds = new Set<number>([1, 3]);

export const favoritesHandlers = [
  http.get(`${baseURL}/favorites/`, async ({ request }) => {
    await delay(250);
    const url = new URL(request.url);
    const asPaginated = url.searchParams.get('paginated') === 'true';

    const items = MOCK_ARTWORKS.filter((art) =>
      favoriteArtworkIds.has(art.id),
    ).map((art) => ({
      profile: 1,
      artwork: art,
    }));

    if (asPaginated) {
      return HttpResponse.json(
        {
          data: items,
          meta: {
            total: items.length,
            page: 1,
            limit: 12,
            totalPages: 1,
          },
        },
        { status: 200 },
      );
    }

    return HttpResponse.json(items, { status: 200 });
  }),

  http.post(`${baseURL}/favorites/`, async ({ request }) => {
    await delay(200);
    const body = (await request.json()) as { artwork?: number };

    if (!body?.artwork) {
      return HttpResponse.json(
        { message: 'artwork ID is required' },
        { status: 400 },
      );
    }

    favoriteArtworkIds.add(Number(body.artwork));
    return HttpResponse.json(
      { profile: 1, artwork: body.artwork },
      { status: 201 },
    );
  }),

  http.delete(`${baseURL}/favorites/:id/`, async ({ params }) => {
    await delay(200);
    const id = Number(params.id);
    favoriteArtworkIds.delete(id);
    return HttpResponse.json(
      { message: 'Artwork removed from favorites' },
      { status: 200 },
    );
  }),
];
