import { IChildProfile, IChildProfileApi } from "../../types";

export const childProfileMapper = (
  childProfile: IChildProfileApi
): IChildProfile => {
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
  } = childProfile;

  return {
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
  };
};
