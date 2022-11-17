export type SignInFields = {
  email: string;
  password: string;
};

export type SignUpFields = SignInFields & { name: string };

export enum USER_ROLES {
  DeadMoroz = "dead_moroz",
  Elf = "elf",
  Child = "child",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  token: string;
  role: USER_ROLES;
}

interface IUserApi {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: USER_ROLES;
}

export interface IDeadMorozApiSignUpResponse {
  message: string;
}

export interface IDeadMorozApiSignUpFailedResponse {
  message: string;
  errors: [string];
}

export interface IDeadMorozApiSignUpSignOutResponse {
  message: string;
}

export interface IDeadMorozApiSignInResponse {
  user: IUserApi;
  message: string;
}
