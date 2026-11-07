import { authHandlers } from './auth';
import { artworksHandlers } from './artworks';

export const handlers = [...authHandlers, ...artworksHandlers];
