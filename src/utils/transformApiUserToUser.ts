import { IUser, IUserApi } from "../types";

export const transformApiUserToUser = (
  userData: Required<IUserApi>
): Omit<IUser, "token"> => {
  const { id, name, email, role, child_profile } = userData;

  let dataToReturn: Omit<IUser, "token"> = {
    id,
    name,
    email,
    role,
    childProfile: null,
  };

  child_profile &&
    (dataToReturn.childProfile = {
      country: child_profile.country,
      city: child_profile.city,
      birthdate: child_profile.birthdate,
      hobbies: child_profile.hobbies,
      pastYearDescription: child_profile.past_year_description,
      goodDeeds: child_profile.good_deeds,
      avatar: child_profile.avatar,
    });

  return dataToReturn;
};
