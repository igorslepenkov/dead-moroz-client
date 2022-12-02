import { IChildReview, IChildReviewApi } from "../../types";

export const childReviewMapper = (
  childReview: IChildReviewApi
): IChildReview => {
  const { id, score, comment, created_at, updated_at, child_profile_id } =
    childReview;

  return {
    id,
    score,
    comment,
    createdAt: created_at,
    updatedAt: updated_at,
    childProfileId: child_profile_id,
  };
};
