import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import { deadMorozApi } from "../../services";
import { morozInfoElvesMapper } from "../../services/mappers";
import {
  IDeadMorozApiGetElvesResponse,
  IDeadMorozApiInviteElfFailedResponse,
  IDeadMorozApiInviteElfResponse,
  IElf,
} from "../../types";
import { RootState } from "../store";

export enum ElvesSortType {
  Name = "name",
  ReviewsCount = "reviews",
}

export enum ElvesFilterType {
  AcceptedInvitation = "accept",
  NotAcceptedInvitation = "not_accept",
}

export enum SortOrder {
  Asc = "ASC",
  Desc = "DESC",
}

export interface IElvesRequestData {
  page: number;
  sort_type: ElvesSortType | null;
  filter_type: ElvesFilterType | null;
  sort_order: SortOrder | null;
  limit: number;
}

interface InitialState {
  elves: IElf[] | null;
  totalPages: number | null;
  totalRecords: number | null;
  requestData: IElvesRequestData;
  isLoading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: InitialState = {
  elves: null,
  totalPages: null,
  totalRecords: null,
  requestData: {
    page: 1,
    sort_type: null,
    filter_type: null,
    sort_order: null,
    limit: 5,
  },
  isLoading: false,
  error: null,
  message: null,
};

const fetchMorozInfoElves = createAsyncThunk<
  IDeadMorozApiGetElvesResponse | null,
  undefined,
  { state: RootState; rejectValue: string }
>("morozInfoElves/fetch", async (_, { rejectWithValue, getState }) => {
  try {
    const {
      user: { user },
      morozInfoElves: { requestData },
    } = getState();

    if (user) {
      return await deadMorozApi.fetchMorozInfoElves(user.token, requestData);
    }

    return rejectWithValue("User is not logged in");
  } catch (err) {
    return rejectWithValue("Could not fetch moroz info elves");
  }
});

const inviteNewElf = createAsyncThunk<
  IDeadMorozApiInviteElfResponse,
  { email: string; name: string },
  {
    state: RootState;
    rejectValue: string | IDeadMorozApiInviteElfFailedResponse;
  }
>(
  "morozInfoElves/inviteNewElf",
  async ({ email, name }, { rejectWithValue, getState }) => {
    try {
      const {
        user: { user },
      } = getState();

      if (user) {
        return await deadMorozApi.inviteNewElf(user.token, { email, name });
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

const acceptNewElfInvitation = createAsyncThunk<
  IDeadMorozApiInviteElfResponse,
  { password: string; token: string },
  {
    state: RootState;
    rejectValue: string | IDeadMorozApiInviteElfFailedResponse;
  }
>(
  "morozInfoElves/acceptNewElfInvitation",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      return await deadMorozApi.acceptNewElfInvitation({
        password,
        token,
      });
    } catch (err: any) {
      if (err.response) {
        return rejectWithValue(err.response.data.message);
      }

      return rejectWithValue(err.message);
    }
  }
);

const morozInfoElvesSlice = createSlice({
  name: "morozInfoElves",
  initialState,
  reducers: {
    setRequestData: (
      state,
      { payload }: PayloadAction<Partial<IElvesRequestData>>
    ) => {
      state.requestData = {
        ...state.requestData,
        ...payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMorozInfoElves.fulfilled, (state, { payload }) => {
      if (payload) {
        const { elves, total_pages, total_records } = payload;
        state.elves = elves.map((elf) => morozInfoElvesMapper(elf));
        state.totalPages = total_pages;
        state.totalRecords = total_records;
      }
    });

    builder.addCase(fetchMorozInfoElves.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload;
      }
    });

    builder.addCase(inviteNewElf.fulfilled, (state, { payload }) => {
      state.message = payload.message;
    });

    builder.addCase(acceptNewElfInvitation.fulfilled, (state, { payload }) => {
      state.message = payload.message;
    });

    builder.addCase(acceptNewElfInvitation.rejected, (state, { payload }) => {
      if (typeof payload === "string") {
        state.message = payload;
      }

      if (typeof payload === "object" && "message" in payload) {
        state.message = payload.message;
      }
    });

    builder.addCase(inviteNewElf.rejected, (state, { payload }) => {
      if (typeof payload === "string") {
        state.message = payload;
      }

      if (typeof payload === "object" && "message" in payload) {
        state.message = payload.message;
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

export default morozInfoElvesSlice.reducer;
const { setRequestData: setMorozInfoElvesRequestParams } =
  morozInfoElvesSlice.actions;
export {
  fetchMorozInfoElves,
  setMorozInfoElvesRequestParams,
  inviteNewElf,
  acceptNewElfInvitation,
};
