import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IUser, SignInSignUpFields } from "../../../types";
import { deadMorozApi } from "../../../services";
import { RootState } from "../../store";

interface IUserInitialState {
  user: IUser | null;
  error: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}

const initialState: IUserInitialState = {
  user: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
};

const signIn = createAsyncThunk<
  IUser,
  SignInSignUpFields,
  { rejectValue: string }
>(
  "user/signIn",
  async (signInData: SignInSignUpFields, { rejectWithValue }) => {
    try {
      const user = await deadMorozApi.signInUser(signInData);
      return user;
    } catch (err: any) {
      if (err.response) {
        return rejectWithValue(err.response.data.message);
      }

      return rejectWithValue(err.message);
    }
  }
);

const signOut = createAsyncThunk<
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
