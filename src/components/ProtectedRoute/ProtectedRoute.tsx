import { Navigate, Outlet } from "react-router-dom";

import { getUser, useAppSelector } from "../../store";

import { ROUTES_URL } from "../../router";

import { USER_ROLES } from "../../types";

interface IProps {
  roleToAccess: USER_ROLES | USER_ROLES[];
}

export const ProtectedRoute = ({ roleToAccess }: IProps) => {
  const user = useAppSelector(getUser);
  const isAccessPermitted = (): boolean => {
    if (user) {
      if (typeof roleToAccess === "string") {
        return user && user.role === roleToAccess;
      }

      return user && roleToAccess.includes(user.role);
    }

    return false;
  };

  if (isAccessPermitted()) {
    return <Outlet />;
  }

  return <Navigate to={ROUTES_URL.HOME} />;
};
