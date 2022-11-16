import axios, { AxiosInstance } from "axios";

import {
  IDeadMorozApiSignInResponse,
  IDeadMorozApiSignUpSignOutResponse,
  IUser,
  SignInSignUpFields,
} from "../types";
import { getTokenFromHeaders } from "../utils";

enum Endpoint {
  SignUp = "users",
  SignIn = "users/sign_in",
  SignOut = "users/sign_out",
}

class DeadMorozApi {
  private readonly BASE_URL: string =
    process.env.NODE_ENV !== "production"
      ? (process.env.REACT_APP_DEAD_MOROZ_URL_DEVELOPMENT as string)
      : (process.env.REACT_APP_DEAD_MOROZ_URL_PRODUCTION as string);

  private readonly API: AxiosInstance = axios.create({
    baseURL: this.BASE_URL,
  });

  signUpUser = async (signUpData: SignInSignUpFields): Promise<string> => {
    const { data } = await this.API.post<IDeadMorozApiSignUpSignOutResponse>(
      Endpoint.SignUp,
      { user: signUpData }
    );
    return data.message;
  };

  signInUser = async (signInData: SignInSignUpFields): Promise<IUser> => {
    const { headers, data } = await this.API.post<IDeadMorozApiSignInResponse>(
      Endpoint.SignIn,
      { user: signInData }
    );
    const token = getTokenFromHeaders(headers) as string;
    const {
      user: { id, email, role },
    } = data;
    return {
      id,
      email,
      token,
      role,
    };
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
}

export const deadMorozApi = new DeadMorozApi();
