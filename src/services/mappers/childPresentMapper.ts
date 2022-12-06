import { IPresent, IPresentApi } from "../../types";

export const childPresentMapper = (childPresent: IPresentApi): IPresent => {
  const { id, name, image, created_at, updated_at, child_profile_id, user_id } =
    childPresent;
  return {
    id,
    name,
    image,
    createdAt: created_at,
    updatedAt: updated_at,
    childProfileId: child_profile_id,
    createdUserId: user_id,
  };
};
