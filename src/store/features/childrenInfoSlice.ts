import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import { deadMorozApi } from "../../services";
import {
  GetChildrenOptions,
  IApiChild,
  IDeadMorozApiGetChildProfilesReponse,
} from "../../types";
import { RootState } from "../store";

interface InitialState {
  children: IApiChild[] | null;
  totalPages: number | null;
  totalRecords: number | null;
  requestData: GetChildrenOptions;
  error: string | null;
  isLoading: boolean;
}

const initialState: InitialState = {
  children: null,
  totalPages: null,
  totalRecords: null,
  requestData: {
    page: 1,
    sort_type: null,
    filter_type: null,
    sort_order: null,
    limit: 5,
  },
  error: null,
  isLoading: false,
};

const fetchChildrenInfo = createAsyncThunk<
  IDeadMorozApiGetChildProfilesReponse | null,
  undefined,
  { state: RootState; rejectValue: string }
>("childrenInfo/fetch", async (_, { rejectWithValue, getState }) => {
  try {
    const {
      user: { user },
      childrenInfo: { requestData },
    } = getState();

    if (user) {
      return await deadMorozApi.getChildren(user.token, requestData);
    }

    return rejectWithValue("User is not logged in");
  } catch (err) {
    return rejectWithValue("Could not fetch moroz info elves");
  }
});

const childrenInfoSlice = createSlice({
  name: "childrenInfo",
  initialState,
  reducers: {
    setChildrenRequestData: (
      state,
      { payload }: PayloadAction<Partial<GetChildrenOptions>>
    ) => {
      state.requestData = {
        ...state.requestData,
        ...payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchChildrenInfo.fulfilled, (state, { payload }) => {
      if (payload) {
        const { children, total_pages, total_records } = payload;

        state.children = children;
        state.totalPages = total_pages;
        state.totalRecords = total_records;
      }
    });

    builder.addCase(fetchChildrenInfo.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload;
      }
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

export default childrenInfoSlice.reducer;
export const { setChildrenRequestData } = childrenInfoSlice.actions;
export { fetchChildrenInfo };
