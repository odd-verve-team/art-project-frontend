export interface Artist {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
}

export interface Artwork {
  id: number;
  title: string;
  image_url: string;
  image_width: number;
  image_height: number;
  price: string;
  artist: Artist;

  description?: string;
  category?: string;
  painting_length?: number;
  painting_width?: number;
  status?: string;
  is_featured?: boolean;
  created_at?: string;
  year: number;
  medium: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ArtworksResponse {
  data: Artwork[];
  meta: PaginationMeta;
}