import { http, HttpResponse, delay } from 'msw';

const baseURL = import.meta.env.VITE_API_BASE_URL || '';

export interface NotificationItem {
  created_at: string;
  title: string;
  message_body: string | null;
}

const mockNotifications: NotificationItem[] = [
  {
    created_at: '2026-10-31',
    title: 'New Order',
    message_body: 'Someone wants to buy your artwork.',
  },
  {
    created_at: '2026-10-15',
    title: 'Artwork Approved',
    message_body:
      'Your artwork "Shadow of Stillness" has been approved and listed in the gallery.',
  },
  {
    created_at: '2026-09-20',
    title: 'Application Received',
    message_body:
      'Your artist verification application is under review by our curators.',
  },
];

export const notificationsHandlers = [
  // 1. GET /notifications/
  http.get(`${baseURL}/notifications/`, async ({ request }) => {
    const url = new URL(request.url);

    const errorStatus = url.searchParams.get('mock_error');
    if (errorStatus) {
      const status = Number(errorStatus) || 500;
      return HttpResponse.json(
        { message: `Simulated error ${status}` },
        { status },
      );
    }

    await delay(300);
    return HttpResponse.json(mockNotifications, { status: 200 });
  }),

  // 2. POST /notifications/buy-artwork/
  http.post(`${baseURL}/notifications/buy-artwork/`, async ({ request }) => {
    await delay(350);
    const body = (await request.json()) as { artwork?: number };

    if (!body?.artwork) {
      return HttpResponse.json(
        { message: 'artwork ID is required' },
        { status: 400 },
      );
    }

    mockNotifications.unshift({
      created_at: new Date().toISOString().split('T')[0],
      title: 'New Purchase Request',
      message_body: `Buyer requested artwork #${body.artwork}.`,
    });

    return HttpResponse.json(
      { message: 'Purchase notification sent successfully' },
      { status: 201 },
    );
  }),

  // 3. POST /notifications/become-artist/
  http.post(`${baseURL}/notifications/become-artist/`, async () => {
    await delay(300);

    mockNotifications.unshift({
      created_at: new Date().toISOString().split('T')[0],
      title: 'Artist Application Submitted',
      message_body: 'Your application has been submitted to administrators.',
    });

    return HttpResponse.json(
      { message: 'Artist application submitted successfully' },
      { status: 201 },
    );
  }),
];
