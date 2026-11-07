export type UserRole = 'user' | 'artist' | 'admin';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

// Returned by POST /users/authenticate/
export interface UserDetail {
  id: string;
  email: string;
  role: UserRole;
  application_status: ApplicationStatus | null;
}

export interface Address {
  country: string;
  city: string;
  postal_code: string;
}

// Returned by GET /users/profile/
export interface UserProfile {
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone_number: string | null;
  avatar_url: string | null;
  address?: Address;
}
