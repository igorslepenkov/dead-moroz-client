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

export interface IPresentApi {
  id: number;
  name: string;
  image: {
    url: string | null;
  };
  created_at: string;
  updated_at: string;
  child_profile_id: number;
  user_id: number;
}

export interface IPresent {
  id: number;
  name: string;
  image: {
    url: string | null;
  };
  createdAt: string;
  updatedAt: string;
  childProfileId: number | null;
  createdUserId: number;
}

export interface IChildReviewApi {
  id: number;
  score: number;
  comment: string;
  created_at: string;
  updated_at: string;
  child_profile_id: number;
  user_id: number;
}

export interface IChildReview {
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  childProfileId: number;
  createdBy: number;
}

export interface IChildProfile {
  id: number;
  userId: number;
  country: string;
  city: string;
  birthdate: string;
  hobbies: string;
  pastYearDescription: string;
  goodDeeds: string;
  avatar: {
    url: string | null;
  };
  createdAt: string;
  updatedAt: string;
  childPresents: IPresent[];
  childReviews: IChildReview[];
}

export interface IChildProfileApi {
  id: number;
  user_id: number;
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
  child_presents: IPresentApi[];
  child_reviews: IChildReviewApi[];
}

export type CreateChildPresent = {
  present: {
    name: string;
    image?: string;
  };
  childProfileId: number;
};

export type UpdateChildProfile = Partial<
  Omit<IChildProfile, "avatar"> & { avatar: string }
>;

export interface IUser {
  id: number;
  name: string;
  email: string;
  token: string;
  role: USER_ROLES;
  childProfile: Omit<IChildProfile, "childReviews"> | null;
}

export interface IUserApi {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: USER_ROLES;
  child_profile: Omit<IChildProfileApi, "child_reviews"> | null;
}

export interface IElfApi {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  invitation_sent_at: string;
  reviews_count: number;
}

export interface IElf {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  invitationSentAt: string;
  reviewsCount: number;
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
  page: number;
  sort_type: "name" | "score" | null;
  filter_type: "scored" | "not_scored" | null;
  sort_order: "ASC" | "DESC" | null;
  limit: number | null;
};

export type CreatePresentOptions = {
  user_id: number;
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

export interface IDeadMorozApiGetFullChildInfoFailedResponse {
  message: string;
  errors: string[];
}

export interface IFullChildInfoApi {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: USER_ROLES;
  child_profile: IChildProfileApi;
}

export interface IFullChild {
  id: number;
  profileId: number;
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
  createdAt: string;
  updatedAt: string;
  role: USER_ROLES;
}

export interface IFullChildInfo {
  child: IFullChild;
  presents: IPresent[];
  reviews: IChildReview[];
}

export type CreateChildReview = {
  score: number;
  comment: string;
  user_id: number;
};

export interface IDeadMorozApiCreateReviewResponse {
  message: string;
  errors: string[];
}

export interface IDeadMorozApiDeleteReviewResponse {
  message: string;
  errors: string[];
}

export interface IDeadMorozApiTranslateProfileResponse {
  country: string;
  city: string;
  hobbies: string;
  past_year_description: string;
  good_deeds: string;
}

export interface IMorozInfoGeneralApi {
  elves: {
    count: number;
    invited: number;
    accepted_invitation: number;
    not_accepted_invitation: number;
  };
  children: {
    count: number;
    with_review_count: number;
    without_review_count: number;
  };
}

export interface IMorozInfoGeneral {
  elves: {
    count: number;
    invited: number;
    acceptedInvitation: number;
    notAcceptedInvitation: number;
  };
  children: {
    count: number;
    withReviewCount: number;
    withoutReviewCount: number;
  };
}

export interface IDeadMorozApiGetElvesResponse {
  elves: IElfApi[];
  page: number;
  total_pages: number;
  total_records: number;
  limit: number;
}

export interface IDeadMorozApiInviteElfResponse {
  message: string;
}

export type IDeadMorozApiInviteElfFailedResponse =
  | {
      message: string;
    }
  | {
      message: string;
      errors: string[];
    };
