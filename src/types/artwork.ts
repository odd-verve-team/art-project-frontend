export interface Artwork {
  id: number;
  title: string;
  image_url: string;
  image_width: number;
  image_height: number;
  artist_full_name: string;
  price: string;

  description?: string;
  category?: string;
  painting_length?: number;
  painting_width?: number;
  status?: string;
  is_featured?: boolean;
  created_at?: string;
  artist?: number;
}
