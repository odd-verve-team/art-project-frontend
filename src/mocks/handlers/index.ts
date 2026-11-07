import { authHandlers } from './auth';
import { artworksHandlers } from './artworks';
import { artistsHandlers } from './artists';

export const handlers = [
  ...authHandlers,
  ...artworksHandlers,
  ...artistsHandlers,
];
