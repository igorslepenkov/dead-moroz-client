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

export interface IChildProfile {
  country: string;
  city: string;
  hobbies: string;
  birthdate: string;
  pastYearDescription: string;
  goodDeeds: string;
  avatar: {
    url: string | null;
  };
}

interface IChildProfileApi {
  id: string;
  user_id: string;
  country: string;
  city: string;
  birthdate: string;
  hobbies: string;
  past_year_description: string;
  good_deeds: string;
  avatar: {
    url: string | null;
  };
  created_at: string;
  updated_at: string;
}

export type UpdateChildProfile = Partial<
  Omit<IChildProfile, "avatar"> & { avatar: File }
>;

export interface IUser {
  id: string;
  name: string;
  email: string;
  token: string;
  role: USER_ROLES;
  childProfile: IChildProfile | null;
}

export interface IUserApi {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: USER_ROLES;
  child_profile: IChildProfileApi | null;
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

export type IDeadMorozApiCreateChildProfileResponse = Required<IUserApi>;

export interface IDeadMorozApiCreateChildProfileFailedResponse {
  message: string;
  errors: [string];
}

export type IDeadMorozApiUpdateChildProfileResponse = Required<IUserApi>;
export interface IDeadMorozApiUpdateChildProfileFailedResponse {
  message: string;
  errors: [string];
}
