import { store, RootState, AppDispatch } from "./store";

import { useAppDispatch, useAppSelector } from "./hooks";

import {
  signInUser,
  signOutUser,
  signUpUser,
  createChildProfile,
  addAvatarToChildProfile,
  addChildPresentToWishlist,
  deleteChildPresent,
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
  addAvatarToChildProfile,
  addChildPresentToWishlist,
  deleteChildPresent,
};
export type { RootState, AppDispatch };
