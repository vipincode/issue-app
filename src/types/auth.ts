export enum AUTH_TOKEN {
  ACCESS = 'access_token',
  REFRESH = 'refresh_token',
}

export interface UserType {
  id: string;
  email: string;
  name: string | null;
}
