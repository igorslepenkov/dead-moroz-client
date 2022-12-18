import axios, { AxiosInstance } from "axios";

import {
  CreateChildPresent,
  IDeadMorozApiGetChildProfilesReponse,
  GetChildrenOptions,
  IChildProfile,
  IDeadMorozApiCreateChildProfileResponse,
  IDeadMorozApiDeleteChildPresentResponse,
  IDeadMorozApiSignInResponse,
  IDeadMorozApiSignUpSignOutResponse,
  IDeadMorozApiUpdateChildProfileResponse,
  IUser,
  SignInFields,
  SignUpFields,
  UpdateChildProfile,
  IFullChildInfoApi,
  IPresentApi,
  CreateChildReview,
  IChildReviewApi,
  IDeadMorozApiTranslateProfileResponse,
  IMorozInfoGeneralApi,
  IMorozInfoGeneral,
} from "../types";

import {
  addOptionalQueryParametersToUrl,
  createDinamicUrlString,
  getTokenFromHeaders,
} from "../utils";
import {
  childProfileMapper,
  morozInfoGeneralMapper,
  userApiMapper,
} from "./mappers";

enum Endpoint {
  SignUp = "users",
  SignIn = "users/sign_in",
  SignOut = "users/sign_out",
  ChildProfile = "users/:id/child_profile",
  ChildProfiles = "child_profiles",
  ChildPresents = "child_profiles/:child_profile_id/child_presents",
  DeleteChildPresent = "child_profiles/:child_profile_id/child_presents/:id",
  CreateChildReview = "child_profiles/:child_profile_id/child_reviews",
  DeleteChildReview = "child_profiles/:child_profile_id/child_reviews/:id",
  TranslateChildProfile = "child_profiles/:child_profile_id/translation",
  GetMorozBoardInfoGeneral = "moroz_board/info",
}

class DeadMorozApi {
  private readonly BASE_URL: string =
    process.env.NODE_ENV !== "production"
      ? (process.env.REACT_APP_DEAD_MOROZ_URL_DEVELOPMENT as string)
      : (process.env.REACT_APP_DEAD_MOROZ_URL_PRODUCTION as string);

  private readonly API: AxiosInstance = axios.create({
    baseURL: this.BASE_URL,
  });

  signUpUser = async (signUpData: SignUpFields): Promise<string> => {
    const { data } = await this.API.post<IDeadMorozApiSignUpSignOutResponse>(
      Endpoint.SignUp,
      { user: signUpData }
    );
    return data.message;
  };

  signInUser = async (
    signInData: SignInFields
  ): Promise<IUser & { message: string }> => {
    const { headers, data } = await this.API.post<IDeadMorozApiSignInResponse>(
      Endpoint.SignIn,
      { user: signInData }
    );
    const token = getTokenFromHeaders(headers) as string;
    const {
      user: { id, name, email, role, child_profile },
      message,
    } = data;

    let userDataToReturn: IUser & { message: string } = {
      id,
      name,
      email,
      token,
      role,
      message,
      childProfile: null,
    };

    child_profile &&
      (userDataToReturn.childProfile = childProfileMapper(child_profile));

    return userDataToReturn;
  };

  signOutUser = async (userToken: string): Promise<string> => {
    const { data } = await this.API.delete<IDeadMorozApiSignUpSignOutResponse>(
      Endpoint.SignOut,
      {
        headers: {
          // prettier-ignore
          'Authorization': `Bearer ${userToken}`,
        },
      }
    );

    return data.message;
  };

  createChildProfile = async (
    userToken: string,
    userId: number,
    childProfileData: IChildProfile
  ): Promise<Omit<IUser, "token">> => {
    const url = createDinamicUrlString(Endpoint.ChildProfile, {
      id: userId,
    });

    const { data: userData } =
      await this.API.post<IDeadMorozApiCreateChildProfileResponse>(
        url,
        {
          child_profile: {
            country: childProfileData.country,
            city: childProfileData.city,
            hobbies: childProfileData.hobbies,
            birthdate: childProfileData.birthdate,
            good_deeds: childProfileData.goodDeeds,
            past_year_description: childProfileData.pastYearDescription,
          },
        },
        {
          headers: {
            // prettier-ignore
            'Authorization': `Bearer ${userToken}`,
          },
        }
      );

    return userApiMapper(userData, userToken);
  };

  updateChildProfile = async (
    userToken: string,
    userId: number,
    updateData: UpdateChildProfile
  ): Promise<Promise<Omit<IUser, "token">>> => {
    const url = createDinamicUrlString(Endpoint.ChildProfile, { id: userId });
    const { data: userData } =
      await this.API.patch<IDeadMorozApiUpdateChildProfileResponse>(
        url,
        { child_profile: updateData },
        {
          headers: {
            // prettier-ignore
            "Authorization": `Bearer ${userToken}`,
          },
        }
      );

    return userApiMapper(userData, userToken);
  };

  addPresentToWishlist = async (
    userToken: string,
    { present, childProfileId }: CreateChildPresent,
    opts?: { userId: number }
  ) => {
    const url = createDinamicUrlString(Endpoint.ChildPresents, {
      child_profile_id: childProfileId,
    });

    const { data } = await this.API.post<IPresentApi[]>(
      opts && opts.userId
        ? addOptionalQueryParametersToUrl(url, {
            user_id: opts.userId,
          })
        : url,
      { child_present: present },
      {
        headers: {
          // prettier-ignore
          'Authorization': `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  };

  deleteChildPresent = async (
    userToken: string,
    childProfileId: number,
    presentId: number
  ) => {
    const url = createDinamicUrlString(Endpoint.DeleteChildPresent, {
      child_profile_id: childProfileId,
      id: presentId,
    });

    const { data } =
      await this.API.delete<IDeadMorozApiDeleteChildPresentResponse>(url, {
        headers: {
          // prettier-ignore
          'Authorization': `Bearer ${userToken}`,
        },
      });

    return data;
  };

  getChildren = async (userToken: string, options: GetChildrenOptions) => {
    const url = addOptionalQueryParametersToUrl(
      Endpoint.ChildProfiles,
      options
    );

    const { data } = await this.API.get<IDeadMorozApiGetChildProfilesReponse>(
      url,
      {
        headers: {
          // prettier-ignore
          'Authorization': `Bearer ${userToken}`,
        },
      }
    );

    return data;
  };

  getFullChildInfoById = async (userToken: string, id: number) => {
    const url = createDinamicUrlString(Endpoint.ChildProfile, { id });
    const { data } = await this.API.get<IFullChildInfoApi>(url, {
      headers: {
        // prettier-ignore
        'Authorization': `Bearer ${userToken}`,
      },
    });

    return data;
  };

  createChildReview = async (
    userToken: string,
    childProfileId: number,
    review: CreateChildReview
  ) => {
    const url = createDinamicUrlString(Endpoint.CreateChildReview, {
      child_profile_id: childProfileId,
    });
    const { data } = await this.API.post<IChildReviewApi[]>(url, review, {
      headers: {
        // prettier-ignore
        'Authorization': `Bearer ${userToken}`,
      },
    });

    return data;
  };

  deleteChildReview = async (
    userToken: string,
    childProfileId: number,
    reviewId: number
  ) => {
    const url = createDinamicUrlString(Endpoint.DeleteChildReview, {
      child_profile_id: childProfileId,
      id: reviewId,
    });

    const { data } = await this.API.delete<IChildReviewApi[]>(url, {
      headers: {
        // prettier-ignore
        'Authorization': `Bearer ${userToken}`,
      },
    });

    return data;
  };

  translateChildProfileFields = async (
    userToken: string,
    childProfileId: number
  ) => {
    const url = createDinamicUrlString(Endpoint.TranslateChildProfile, {
      child_profile_id: childProfileId,
    });

    const { data } = await this.API.get<IDeadMorozApiTranslateProfileResponse>(
      url,
      {
        headers: {
          // prettier-ignore
          'Authorization': `Bearer ${userToken}`,
        },
      }
    );

    return data;
  };

  fetchMorozInfoGeneral = async (
    userToken: string
  ): Promise<IMorozInfoGeneral | null> => {
    const { data } = await this.API.get<IMorozInfoGeneralApi>(
      Endpoint.GetMorozBoardInfoGeneral,
      {
        headers: {
          // prettier-ignore
          'Authorization': `Bearer ${userToken}`,
        },
      }
    );

    return morozInfoGeneralMapper(data);
  };
}

export const deadMorozApi = new DeadMorozApi();
