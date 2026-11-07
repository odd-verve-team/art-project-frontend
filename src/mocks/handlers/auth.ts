import { http, HttpResponse, delay } from 'msw';
import type { UserRole, ApplicationStatus } from '@/types/user';

const baseURL = import.meta.env.VITE_API_BASE_URL || '';

function resolveUserRole(email: string): {
  role: UserRole;
  application_status: ApplicationStatus | null;
} {
  if (email.startsWith('artist')) {
    return { role: 'artist', application_status: 'approved' };
  }
  if (email.startsWith('admin')) {
    return { role: 'admin', application_status: null };
  }
  if (email.startsWith('pending')) {
    return { role: 'user', application_status: 'pending' };
  }
  if (email.startsWith('rejected')) {
    return { role: 'user', application_status: 'rejected' };
  }
  return { role: 'user', application_status: null };
}

export const authHandlers = [
  http.post(`${baseURL}/users/code/`, async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as { email?: string };

    if (!body?.email || !body.email.includes('@')) {
      return HttpResponse.json(
        { message: 'Valid email is required' },
        { status: 400 },
      );
    }

    return HttpResponse.json('Verification code sent to your email', {
      status: 200,
    });
  }),

  http.post(`${baseURL}/users/authenticate/`, async ({ request }) => {
    await delay(500);
    const body = (await request.json()) as { email?: string; code?: string };

    if (!body?.email || !body?.code) {
      return HttpResponse.json(
        { message: 'Email and code are required' },
        { status: 400 },
      );
    }

    if (body.code === '000000' || body.code.length !== 6) {
      return HttpResponse.json(
        { message: 'Invalid verification code' },
        { status: 400 },
      );
    }

    const { role, application_status } = resolveUserRole(body.email);

    return HttpResponse.json(
      {
        tokens: {
          access_token: `mock-access-token-${Date.now()}`,
          refresh_token: `mock-refresh-token-${Date.now()}`,
        },
        user: {
          id: 'user-mock-1',
          email: body.email,
          role,
          application_status,
        },
      },
      { status: 200 },
    );
  }),

  http.post(`${baseURL}/users/refresh/`, async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as { refresh_token?: string };

    if (!body?.refresh_token || body.refresh_token.includes('invalid')) {
      return HttpResponse.json(
        { message: 'Invalid or expired refresh token' },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      {
        access_token: `mock-refreshed-access-token-${Date.now()}`,
        refresh_token: `mock-refreshed-refresh-token-${Date.now()}`,
      },
      { status: 200 },
    );
  }),

  http.post(`${baseURL}/users/logout/`, async () => {
    await delay(200);
    return HttpResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 },
    );
  }),
];
