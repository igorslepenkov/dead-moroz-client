import { store, RootState, AppDispatch } from "./store";

import { useAppDispatch, useAppSelector } from "./hooks";

import {
  signInUser,
  signOutUser,
  signUpUser,
  createChildProfile,
} from "./features";

import {
  getUser,
  getUserError,
  getUserIsLoading,
  getUserIsLoggedIn,
  getUserServerMessage,
} from "./selectors";

export {
  store,
  useAppDispatch,
  useAppSelector,
  signInUser,
  signOutUser,
  getUser,
  getUserError,
  getUserIsLoading,
  getUserIsLoggedIn,
  getUserServerMessage,
  signUpUser,
  createChildProfile,
};
export type { RootState, AppDispatch };
