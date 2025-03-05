export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  city: string;
  state: string;
  pin: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface LoggedInUser {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  email: string;
}

export interface UserToken {
  token: string;
  expiresInSeconds: number;
  user: LoggedInUser
}
