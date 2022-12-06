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
  fetchChildInfo,
  addChildAlternativePresent,
  deleteChildAlternativePresent,
} from "./features";

import {
  getUser,
  getUserError,
  getUserIsLoading,
  getUserIsLoggedIn,
  getUserServerMessage,
  getChildInfo,
  getChildInfoIsLoading,
  getChildInfoError,
  getChildInfoServerMessage,
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
  getChildInfo,
  getChildInfoIsLoading,
  getChildInfoError,
  getChildInfoServerMessage,
  fetchChildInfo,
  addChildAlternativePresent,
  deleteChildAlternativePresent,
};
export type { RootState, AppDispatch };
