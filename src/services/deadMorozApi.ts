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
  IPresent,
  IUser,
  SignInFields,
  SignUpFields,
  UpdateChildProfile,
} from "../types";

import {
  addOptionalQueryParametersToUrl,
  createDinamicUrlString,
  getTokenFromHeaders,
  transformApiUserToUser,
} from "../utils";

enum Endpoint {
  SignUp = "users",
  SignIn = "users/sign_in",
  SignOut = "users/sign_out",
  ChildProfile = "users/:id/child_profile",
  ChildPresents = "users/:id/child_presents",
  DeleteChildPresent = "users/:id/child_presents/:present_id",
  ChildProfiles = "users/child_profiles/:page",
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
      user: { id, name, email, role, child_profile, child_presents },
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
      childPresents: null,
    };

    child_profile &&
      (userDataToReturn.childProfile = {
        country: child_profile.country,
        city: child_profile.city,
        birthdate: child_profile.birthdate,
        hobbies: child_profile.hobbies,
        pastYearDescription: child_profile.past_year_description,
        goodDeeds: child_profile.good_deeds,
        avatar: child_profile.avatar,
      });

    child_presents && (userDataToReturn.childPresents = child_presents);

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
    userId: string,
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

    return transformApiUserToUser(userData);
  };

  updateChildProfile = async (
    userToken: string,
    userId: string,
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
            "Content-Type": updateData.avatar
              ? "multipart/form-data"
              : "application/json",
          },
        }
      );

    return transformApiUserToUser(userData);
  };

  addPresentToWishlist = async (
    userToken: string,
    userId: string,
    present: CreateChildPresent
  ) => {
    const url = createDinamicUrlString(Endpoint.ChildPresents, { id: userId });
    const { data } = await this.API.post<IPresent[]>(
      url,
      { child_present: [present] },
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
    userId: string,
    presentId: string
  ) => {
    const url = createDinamicUrlString(Endpoint.DeleteChildPresent, {
      id: userId,
      present_id: presentId,
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

  getChildren = async (
    userToken: string,
    page: number,
    options: GetChildrenOptions
  ) => {
    const url = addOptionalQueryParametersToUrl(
      createDinamicUrlString(Endpoint.ChildProfiles, { page: page.toString() }),
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
}

export const deadMorozApi = new DeadMorozApi();
