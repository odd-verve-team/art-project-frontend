export interface AuthCodeRequest {
  email: string;
}

export interface AuthVerifyRequest {
  email: string;
  code: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}
