import type { UserProfile } from './user';

export interface SocialMedia {
  instagram: string | null;
  twitter: string | null;
  telegram: string | null;
  facebook: string | null;
}

export interface PublicAddress {
  country: string;
  city: string;
}

export interface ArtistArtworkMin {
  id: number;
  title?: string;
  image_url: string;
  image_width: number;
  image_height: number;
  artist: {
    id?: number;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
}

// GET /artists/{id}/
export interface ArtistDetail {
  id: number;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  style: string | null;
  statement: string | null;
  image_url: string | null;
  address: PublicAddress;
  social_media: SocialMedia;
  artworks: ArtistArtworkMin[];
}

// GET/PUT/PATCH /artists/profile/
export interface ArtistProfile extends UserProfile {
  id: number;
  bio: string | null;
  style: string | null;
  statement: string | null;
  social_media: SocialMedia;
}
