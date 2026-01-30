export interface JwtUserPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type IdParams = {
  id: string;
};
