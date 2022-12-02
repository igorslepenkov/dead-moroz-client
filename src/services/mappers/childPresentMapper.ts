import { IPresent, IPresentApi } from "../../types";

export const childPresentMapper = (childPresent: IPresentApi): IPresent => {
  const { id, name, image, created_at, updated_at, child_review_id, user_id } =
    childPresent;
  return {
    id,
    name,
    image,
    createdAt: created_at,
    updatedAt: updated_at,
    childReviewId: child_review_id,
    createdUserId: user_id,
  };
};
