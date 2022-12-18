import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice, childInfoSlice, morozInfoGeneralSlice } from "./features";

const rootReducer = combineReducers({
  user: userSlice,
  childInfo: childInfoSlice,
  morozInfoGeneral: morozInfoGeneralSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
