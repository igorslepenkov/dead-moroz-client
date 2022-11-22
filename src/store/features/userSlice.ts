import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

import {
  IChildProfile,
  IDeadMorozApiCreateChildProfileFailedResponse,
  IDeadMorozApiSignUpFailedResponse,
  IUser,
  SignInFields,
  SignUpFields,
} from "../../types";
import { deadMorozApi } from "../../services";
import { RootState } from "../../store";
import { AxiosError } from "axios";

interface IUserInitialState {
  user: IUser | null;
  error: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  message: string | null;
}

const initialState: IUserInitialState = {
  user: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
  message: null,
};

const signUpUser = createAsyncThunk<
  string,
  SignUpFields,
  { rejectValue: IDeadMorozApiSignUpFailedResponse }
>("user/signUp", async (signUpData: SignUpFields, { rejectWithValue }) => {
  try {
    return await deadMorozApi.signUpUser(signUpData);
  } catch (err: any) {
    if (err.response) {
      return rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data.errors,
      });
    }

    return rejectWithValue(err.message);
  }
});

const signInUser = createAsyncThunk<
  IUser & { message: string },
  SignInFields,
  { rejectValue: string }
>("user/signIn", async (signInData: SignInFields, { rejectWithValue }) => {
  try {
    return await deadMorozApi.signInUser(signInData);
  } catch (err: any) {
    if (err instanceof AxiosError && err.response) {
      return rejectWithValue(err.response.data.error);
    }

    return rejectWithValue(err.message);
  }
});

const signOutUser = createAsyncThunk<
  string,
  undefined,
  { state: RootState; rejectValue: string }
>("user/signOut", async (_, { getState, rejectWithValue }) => {
  try {
    const {
      user: { user },
    } = getState();
    if (user) {
      return await deadMorozApi.signOutUser(user.token);
    }

    return rejectWithValue("User is not logged in");
  } catch (err: any) {
    if (err.response) {
      return rejectWithValue(err.response.data.message);
    }

    return rejectWithValue(err.message);
  }
});

const createChildProfile = createAsyncThunk<
  Omit<IUser, "token">,
  IChildProfile,
  {
    state: RootState;
    rejectValue: IDeadMorozApiCreateChildProfileFailedResponse | string;
  }
>(
  "user/createChildProfile",
  async (childProfileData: IChildProfile, { getState, rejectWithValue }) => {
    try {
      const {
        user: { user },
      } = getState();
      if (user) {
        return await deadMorozApi.createChildProfile(
          user.token,
          user.id,
          childProfileData
        );
      } else {
        return rejectWithValue("User is not logged in");
      }
    } catch (err: any) {
      if (err.response) {
        return rejectWithValue({
          message: err.response.data.message,
          errors: err.response.data.errors,
        });
      }

      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      state.message = payload;
    });

    builder.addCase(signUpUser.rejected, (state, { payload }) => {
      if (payload) {
        state.message = payload.message;
        state.error = payload.errors[0];
      }
    });

    builder.addCase(
      signInUser.fulfilled,
      (
        state,
        { payload: { id, name, email, token, role, childProfile, message } }
      ) => {
        state.isLoggedIn = true;
        state.user = { id, name, email, token, role, childProfile };
        state.message = message;
      }
    );

    builder.addCase(signInUser.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload;
      }
    });

    builder.addCase(signOutUser.fulfilled, (state, { payload }) => {
      state.isLoggedIn = false;
      state.user = null;
      state.message = payload;
    });

    builder.addCase(signOutUser.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload;
      }
    });

    builder.addCase(createChildProfile.fulfilled, (state, { payload }) => {
      if (state.user) {
        state.user.childProfile = payload.childProfile;
      }
    });

    builder.addCase(createChildProfile.rejected, (state, { payload }) => {
      if (payload && typeof payload === "string") {
        state.error = payload;
      }

      if (payload && typeof payload === "object" && "message" in payload) {
        state.error = payload.message;
      }
    });

    builder.addMatcher(isPending(), (state) => {
      state.error = null;
      state.isLoading = true;
      state.message = null;
    });

    builder.addMatcher(isFulfilled(), (state) => {
      state.isLoading = false;
    });

    builder.addMatcher(isRejected(), (state) => {
      state.isLoading = false;
    });
  },
});

export { signInUser, signOutUser, signUpUser, createChildProfile };
export default userSlice.reducer;
