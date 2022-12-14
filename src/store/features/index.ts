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
};
