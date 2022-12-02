import { IUser, IUserApi } from "../../types";
import { childPresentMapper } from "./childPresentMapper";
import { childProfileMapper } from "./childProfileMapper";

export const userApiMapper = (user: IUserApi, token: string): IUser => {
  const { id, name, email, role, child_presents, child_profile } = user;
  const userToReturn = {
    id,
    name,
    email,
    token,
    role,
    childProfile: child_profile ? childProfileMapper(child_profile) : null,
    childPresents: child_presents
      ? child_presents.map((childPresent) => childPresentMapper(childPresent))
      : [],
  };

  return userToReturn;
};
