export type UserResponse = {
  name: string;
  email: string;
  token: string;
};

export type AuthenticateData = {
  email: string;
  password: string;
};

export type CreateUserData = {
  name: string;
  email: string;
  password: string;
};
