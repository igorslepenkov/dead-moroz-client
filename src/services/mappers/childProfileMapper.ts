import { IChildProfile, IChildProfileApi } from "../../types";
import { childPresentMapper } from "./childPresentMapper";
import { childReviewMapper } from "./childReviewMapper";

export const childProfileMapper = (
  childProfile: IChildProfileApi | Omit<IChildProfileApi, "child_reviews">
): IChildProfile | Omit<IChildProfile, "childReviews"> => {
  const {
    id,
    user_id,
    country,
    city,
    birthdate,
    hobbies,
    past_year_description,
    good_deeds,
    avatar,
    created_at,
    updated_at,
    child_presents,
  } = childProfile;

  const profile = {
    id,
    userId: user_id,
    country,
    city,
    birthdate,
    hobbies,
    pastYearDescription: past_year_description,
    goodDeeds: good_deeds,
    avatar,
    createdAt: created_at,
    updatedAt: updated_at,
    childPresents: child_presents.map((present) => childPresentMapper(present)),
  };

  if ("child_reviews" in childProfile) {
    return Object.assign(profile, {
      childReviews: childProfile.child_reviews.map((review) =>
        childReviewMapper(review)
      ),
    });
  }

  return profile;
};
