import { IUser, IUserApi } from "../../types";
import { childProfileMapper } from "./childProfileMapper";

export const userApiMapper = (user: IUserApi, token: string): IUser => {
  const { id, name, email, role, child_profile } = user;
  const userToReturn = {
    id,
    name,
    email,
    token,
    role,
    childProfile: child_profile ? childProfileMapper(child_profile) : null,
  };

  return userToReturn;
};
