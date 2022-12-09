import { IFullChildInfo, IFullChildInfoApi } from "../../types";
import { childPresentMapper } from "./childPresentMapper";
import { childReviewMapper } from "./childReviewMapper";

export const fullChildInfoMapper = (
  childInfo: IFullChildInfoApi
): IFullChildInfo => {
  const {
    id,
    name,
    email,
    created_at,
    updated_at,
    role,
    child_profile: {
      id: profile_id,
      country,
      city,
      birthdate,
      hobbies,
      past_year_description,
      good_deeds,
      avatar,
      child_reviews,
      child_presents,
    },
  } = childInfo;

  return {
    child: {
      id,
      profileId: profile_id,
      email,
      name,
      createdAt: created_at,
      updatedAt: updated_at,
      role,
      country,
      city,
      birthdate,
      hobbies,
      pastYearDescription: past_year_description,
      goodDeeds: good_deeds,
      avatar,
    },
    presents: child_presents.map((present) => childPresentMapper(present)),
    reviews: child_reviews.map((review) => childReviewMapper(review)),
  };
};
