import { authHandlers } from './auth';
import { artworksHandlers } from './artworks';
import { artistsHandlers } from './artists';
import { favoritesHandlers } from './favorites';
import { notificationsHandlers } from './notifications';

export const handlers = [
  ...authHandlers,
  ...artworksHandlers,
  ...artistsHandlers,
  ...favoritesHandlers,
  ...notificationsHandlers,
];
