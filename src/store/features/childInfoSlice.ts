import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { deadMorozApi } from "../../services";
import { childPresentMapper, childReviewMapper } from "../../services/mappers";
import { fullChildInfoMapper } from "../../services/mappers/fullChildInfoMapper";

import {
  CreateChildPresent,
  IChildReview,
  IDeadMorozApiAddChildPresentFailedResponse,
  IDeadMorozApiCreateReviewResponse,
  IDeadMorozApiDeleteChildFailedResponse,
  IDeadMorozApiDeleteChildPresentResponse,
  IDeadMorozApiDeleteReviewResponse,
  IDeadMorozApiGetFullChildInfoFailedResponse,
  IFullChildInfo,
  IPresent,
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

const addChildAlternativePresent = createAsyncThunk<
  IPresent[],
  CreateChildPresent,
  {
    state: RootState;
    rejectValue: IDeadMorozApiAddChildPresentFailedResponse | string;
  }
>(
  "childInfo/addChildAlternativePresent",
  async (presentData, { getState, rejectWithValue }) => {
    try {
      const {
        user: { user },
      } = getState();

      if (user && presentData.childProfileId) {
        const response = await deadMorozApi.addPresentToWishlist(
          user.token,
          presentData,
          {
            userId: user.id,
          }
        );

        return response.map((present) => childPresentMapper(present));
      }

      return rejectWithValue("Error while adding present");
    } catch (err: any) {
      if (err.response) {
        return rejectWithValue(err.response.data);
      }

      return rejectWithValue(err.message);
    }
  }
);

const deleteChildAlternativePresent = createAsyncThunk<
  IDeadMorozApiDeleteChildPresentResponse,
  { presentId: number; childProfileId: number },
  {
    state: RootState;
    rejectValue: IDeadMorozApiDeleteChildFailedResponse | string;
  }
>(
  "childInfo/deleteChildAlternativePresent",
  async ({ presentId, childProfileId }, { rejectWithValue, getState }) => {
    try {
      const {
        user: { user },
      } = getState();

      if (user) {
        const data = await deadMorozApi.deleteChildPresent(
          user.token,
          childProfileId,
          presentId
        );
        return data;
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

const createChildReview = createAsyncThunk<
  IChildReview[],
  { score: number; comment: string },
  { state: RootState; rejectValue: IDeadMorozApiCreateReviewResponse | string }
>(
  "childInfo/createChildReview",
  async ({ score, comment }, { rejectWithValue, getState }) => {
    try {
      const {
        user: { user },
        childInfo: { childInfo },
      } = getState();

      if (user && childInfo) {
        const response = await deadMorozApi.createChildReview(
          user.token,
          childInfo.child.profileId,
          { score, comment, user_id: user.id }
        );
        return response.map((review) => childReviewMapper(review));
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

const deleteChildReview = createAsyncThunk<
  IChildReview[],
  number,
  { rejectValue: IDeadMorozApiDeleteReviewResponse | string; state: RootState }
>(
  "childInfo/deleteChildReview",
  async (reviewId, { rejectWithValue, getState }) => {
    try {
      const {
        user: { user },
        childInfo: { childInfo },
      } = getState();

      if (user && childInfo) {
        const response = await deadMorozApi.deleteChildReview(
          user.token,
          childInfo.child.profileId,
          reviewId
        );
        return response.map((review) => childReviewMapper(review));
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

    builder.addCase(
      addChildAlternativePresent.fulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        if (state.childInfo) {
          state.childInfo.presents = payload;
        }
      }
    );

    builder.addCase(
      addChildAlternativePresent.rejected,
      (state, { payload }) => {
        if (typeof payload === "string") {
          state.error = payload;
        }

        if (typeof payload === "object") {
          state.message = payload.message;
          state.error = payload.errors[0];
        }
      }
    );

    builder.addCase(
      deleteChildAlternativePresent.fulfilled,
      (state, { payload }) => {
        state.message = payload.message;
        if (state.childInfo) {
          state.childInfo.presents = payload.child_presents;
        }
      }
    );

    builder.addCase(
      deleteChildAlternativePresent.rejected,
      (state, { payload }) => {
        if (payload && typeof payload === "string") {
          state.error = payload;
        }

        if (payload && typeof payload === "object" && "message" in payload) {
          state.error = payload.message;
        }
      }
    );

    builder.addCase(createChildReview.fulfilled, (state, { payload }) => {
      if (state.childInfo) {
        state.childInfo.reviews = payload;
      }
    });

    builder.addCase(createChildReview.rejected, (state, { payload }) => {
      if (payload && typeof payload === "string") {
        state.error = payload;
      }

      if (payload && typeof payload === "object" && "message" in payload) {
        state.error = payload.message;
      }
    });

    builder.addCase(deleteChildReview.fulfilled, (state, { payload }) => {
      if (state.childInfo) {
        state.childInfo.reviews = payload;
      }
    });

    builder.addCase(deleteChildReview.rejected, (state, { payload }) => {
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

export default childInfoSlice.reducer;
export {
  fetchChildInfo,
  addChildAlternativePresent,
  deleteChildAlternativePresent,
  createChildReview,
  deleteChildReview,
};
