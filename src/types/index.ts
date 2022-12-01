export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

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

export interface IPresent {
  id: string;
  name: string;
  image: {
    url: string | null;
  };
}

export type CreateChildPresent = {
  name: string;
  image?: File;
};

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
  childPresents: IPresent[] | null;
}

export interface IUserApi {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: USER_ROLES;
  child_profile: IChildProfileApi | null;
  child_presents: IPresent[] | [];
}

export interface IDeadMorozApiSignUpResponse {
  message: string;
}

export interface IDeadMorozApiSignUpFailedResponse {
  message: string;
  errors: string[];
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
  errors: string[];
}

export type IDeadMorozApiUpdateChildProfileResponse = Required<IUserApi>;
export interface IDeadMorozApiUpdateChildProfileFailedResponse {
  message: string;
  errors: string[];
}

export interface IDeadMorozApiAddChildPresentFailedResponse {
  message: string;
  errors: string[];
}

export interface IDeadMorozApiDeleteChildPresentResponse {
  message: string;
  child_presents: IPresent[];
}

export interface IDeadMorozApiDeleteChildFailedResponse {
  message: string;
}

export type GetChildrenOptions = {
  sort_type: "name" | "score" | null;
  filter_type: "scored" | "not_scored" | null;
  sort_order: "ASC" | "DESC" | null;
  limit: number | null;
};

export type IApiChild = Pick<
  IUserApi,
  "id" | "name" | "email" | "created_at" | "updated_at"
>;

export interface IDeadMorozApiGetChildProfilesReponse {
  children: IApiChild[];
  page: number;
  total_pages: number;
  total_records: number;
  limit: number;
}

export interface IChildReview {
  id: string;
  score: number;
  comment: string;
  created_at: string;
  updated_at: string;
  child_profile_id: string;
}

export interface IFullChildInfoApi {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: USER_ROLES;
  child_profile: IChildProfileApi & { child_reviews: IChildReview[] | [] };
  child_presents: IPresent[] | [];
}

export interface IFullChild {
  id: string;
  email: string;
  name: string;
  country: string;
  city: string;
  birthdate: string;
  hobbies: string;
  goodDeeds: string;
  pastYearDescription: string;
  avatar: {
    url: string | null;
  };
}

export interface IFullChildInfo {
  child: IFullChild | null;
  presents: IPresent[] | [];
  reviews: IChildReview[] | [];
}
