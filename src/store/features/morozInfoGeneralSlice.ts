import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { deadMorozApi } from "../../services";
import { IMorozInfoGeneral } from "../../types";
import { RootState } from "../store";

interface InitialState {
  info: IMorozInfoGeneral | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  info: null,
  isLoading: false,
  error: null,
};

const fetchMorozInfoGeneral = createAsyncThunk<
  IMorozInfoGeneral | null,
  undefined,
  { state: RootState; rejectValue: string }
>("morozInfoGeneral/fetch", async (_, { rejectWithValue, getState }) => {
  try {
    const {
      user: { user },
    } = getState();

    if (user) {
      return await deadMorozApi.fetchMorozInfoGeneral(user.token);
    }

    return rejectWithValue("User is not logged in");
  } catch (err) {
    return rejectWithValue("Could not fetch moroz info general");
  }
});

const morozInfoGeneralSlice = createSlice({
  name: "morozInfoGeneral",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMorozInfoGeneral.fulfilled, (state, { payload }) => {
      state.info = payload;
    });

    builder.addMatcher(isPending(), (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addMatcher(isFulfilled(), (state) => {
      state.isLoading = false;
    });

    builder.addMatcher(isRejected(), (state) => {
      state.isLoading = false;
    });
  },
});

export default morozInfoGeneralSlice.reducer;
export { fetchMorozInfoGeneral };
