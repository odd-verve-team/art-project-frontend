import type { ArtworkCategory } from './artwork';

export type UserRole = 'user' | 'artist' | 'admin';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface UserListItem {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  role: UserRole;
  artworks: number[];
  art_categories: ArtworkCategory[];
}

export interface UserDetail extends UserListItem {
  email: string;
  bio: string;
  last_login: string | null;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  created_at: string;
  application_status: ApplicationStatus | null;
  number_of_paid_cell: number;
  groups: number[];
  user_permissions: number[];
}