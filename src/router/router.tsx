import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import { ROUTES_URL } from "./routes";

import { App } from "../App";
import { AuthenticationPage, ChildProfile, HomePage } from "../pages";
import { ProtectedRoute } from "../components";
import { USER_ROLES } from "../types";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES_URL.HOME} element={<App />}>
      <Route index element={<HomePage />} />
      <Route
        path={ROUTES_URL.AUTHENTICATION}
        element={<AuthenticationPage />}
      />
      <Route element={<ProtectedRoute roleToAccess={USER_ROLES.Child} />}>
        <Route path={ROUTES_URL.CHILD_PROFILE} element={<ChildProfile />} />
      </Route>
    </Route>
  )
);
