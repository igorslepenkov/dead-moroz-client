export type SignInSignUpFields = {
  name: string;
  email: string;
  password: string;
};

export enum USER_ROLES {
  DeadMoroz = "dead_moroz",
  Elf = "elf",
  Child = "child",
}

export interface IUser {
  id: string;
  email: string;
  token: string;
  role: USER_ROLES;
}

interface IUserApi {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: USER_ROLES;
}

export interface IDeadMorozApiSignUpSignOutResponse {
  message: string;
}

export interface IDeadMorozApiSignInResponse {
  user: IUserApi;
  message: string;
}
