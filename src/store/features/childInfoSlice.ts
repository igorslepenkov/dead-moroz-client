import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { deadMorozApi } from "../../services";
import { fullChildInfoMapper } from "../../services/mappers/fullChildInfoMapper";

import {
  IDeadMorozApiGetFullChildInfoFailedResponse,
  IFullChildInfo,
} from "../../types";
import { RootState } from "../store";

interface InitialState {
  childInfo: IFullChildInfo | null;
  isLoading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: InitialState = {
  childInfo: null,
  error: null,
  isLoading: false,
  message: null,
};

const fetchChildInfo = createAsyncThunk<
  IFullChildInfo,
  number,
  {
    state: RootState;
    rejectValue: IDeadMorozApiGetFullChildInfoFailedResponse | string;
  }
>(
  "childInfo/fetchChildInfo",
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const {
        user: { user },
      } = getState();

      if (user) {
        const childInfoApi = await deadMorozApi.getFullChildInfoById(
          user.token,
          id
        );

        return fullChildInfoMapper(childInfoApi);
      }

      return rejectWithValue("User is not logged in");
    } catch (err: any) {
      if (err.response) {
        return rejectWithValue(err.response.data.message);
      }

      return rejectWithValue(err.message);
    }
  }
);

const childInfoSlice = createSlice({
  name: "childInfo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchChildInfo.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.childInfo = payload;
    });

    builder.addCase(fetchChildInfo.rejected, (state, { payload }) => {
      if (typeof payload === "string") {
        state.error = payload;
      }

      if (typeof payload === "object") {
        state.message = payload.message;
        state.error = payload.errors[0];
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

export default childInfoSlice.reducer;
export { fetchChildInfo };
