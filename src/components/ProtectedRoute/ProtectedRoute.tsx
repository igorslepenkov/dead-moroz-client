import { Navigate, Outlet } from "react-router-dom";

import { getUser, useAppSelector } from "../../store";

import { ROUTES_URL } from "../../router";

import { USER_ROLES } from "../../types";

interface IProps {
  roleToAccess: USER_ROLES;
}

export const ProtectedRoute = ({ roleToAccess }: IProps) => {
  const user = useAppSelector(getUser);
  if (user && user.role === roleToAccess) {
    return <Outlet />;
  }

  return <Navigate to={ROUTES_URL.HOME} />;
};
