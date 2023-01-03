import userSlice, {
  signInUser,
  signOutUser,
  signUpUser,
  createChildProfile,
  addAvatarToChildProfile,
  addChildPresentToWishlist,
  deleteChildPresent,
} from "./userSlice";

import childInfoSlice, {
  fetchChildInfo,
  addChildAlternativePresent,
  deleteChildAlternativePresent,
  createChildReview,
  deleteChildReview,
} from "./childInfoSlice";

import morozInfoGeneralSlice, {
  fetchMorozInfoGeneral,
} from "./morozInfoGeneralSlice";

import morozInfoElvesSlice, {
  fetchMorozInfoElves,
  IElvesRequestData,
  setMorozInfoElvesRequestParams,
  inviteNewElf,
  acceptNewElfInvitation,
  ElvesFilterType,
  ElvesSortType,
} from "./morozInfoElvesSlice";

import modalSlice, { toggleModal } from "./modalSlice";

import childrenInfoSlice, {
  setChildrenRequestData,
  fetchChildrenInfo,
} from "./childrenInfoSlice";

export {
  signInUser,
  signOutUser,
  userSlice,
  signUpUser,
  createChildProfile,
  addAvatarToChildProfile,
  addChildPresentToWishlist,
  deleteChildPresent,
  childInfoSlice,
  fetchChildInfo,
  addChildAlternativePresent,
  deleteChildAlternativePresent,
  createChildReview,
  deleteChildReview,
  morozInfoGeneralSlice,
  fetchMorozInfoGeneral,
  morozInfoElvesSlice,
  fetchMorozInfoElves,
  setMorozInfoElvesRequestParams,
  inviteNewElf,
  acceptNewElfInvitation,
  toggleModal,
  modalSlice,
  ElvesFilterType,
  ElvesSortType,
  childrenInfoSlice,
  setChildrenRequestData,
  fetchChildrenInfo,
};

export type { IElvesRequestData };
