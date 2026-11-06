import type { UserDetail } from './user';

export interface AuthCodeRequest {
  email: string;
}

export interface AuthVerifyRequest {
  email: string;
  code: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface AuthResponse {
  tokens: AuthTokens;
  user: UserDetail;
}
