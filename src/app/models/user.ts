export interface User {
  id: string;
  password: string;
  name: string;
}

export interface Auth {
  accessToken: string;
  accessTokenExpiresIn: number;
  grantType: string;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  error: string;
  exception: string;
  message: string;
  status: number;
  timestamp: Date;
}
