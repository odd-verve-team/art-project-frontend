import { authHandlers } from './auth';
import { artworksHandlers } from './artworks';
import { artistsHandlers } from './artists';
import { favoritesHandlers } from './favorites';

export const handlers = [
  ...authHandlers,
  ...artworksHandlers,
  ...artistsHandlers,
  ...favoritesHandlers,
];
