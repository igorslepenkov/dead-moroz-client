import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  userSlice,
  childInfoSlice,
  morozInfoGeneralSlice,
  morozInfoElvesSlice,
  modalSlice,
  childrenInfoSlice,
} from "./features";

const rootReducer = combineReducers({
  user: userSlice,
  childInfo: childInfoSlice,
  morozInfoGeneral: morozInfoGeneralSlice,
  morozInfoElves: morozInfoElvesSlice,
  modal: modalSlice,
  childrenInfo: childrenInfoSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
