import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import { ROUTES_URL } from "./routes";

import { App } from "../App";
import {
  AcceptElfInviitationPage,
  AuthenticationPage,
  ChildDetailedInfoPage,
  ChildProfilePage,
  ChildWishlistPage,
  DeadMorozPage,
  ElfDashboardPage,
  HomePage,
} from "../pages";
import {
  ChildrenInfo,
  ElvesInfo,
  MorozInfo,
  ProtectedRoute,
} from "../components";
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
        <Route path={ROUTES_URL.CHILD_PROFILE} element={<ChildProfilePage />} />
        <Route
          path={ROUTES_URL.CHILD_WISHLIST}
          element={<ChildWishlistPage />}
        />
      </Route>

      <Route
        element={
          <ProtectedRoute
            roleToAccess={[USER_ROLES.Elf, USER_ROLES.DeadMoroz]}
          />
        }
      >
        <Route path={ROUTES_URL.ElfDashboard} element={<ElfDashboardPage />} />
        <Route
          path={ROUTES_URL.ChildDetailedInfo}
          element={<ChildDetailedInfoPage />}
        />
      </Route>

      <Route element={<ProtectedRoute roleToAccess={USER_ROLES.DeadMoroz} />}>
        <Route path={ROUTES_URL.MorozBoard} element={<DeadMorozPage />}>
          <Route index element={<MorozInfo />} />
          <Route path={ROUTES_URL.ElvesInfo} element={<ElvesInfo />} />
          <Route path={ROUTES_URL.ChildrenInfo} element={<ChildrenInfo />} />
        </Route>
      </Route>

      <Route
        path={ROUTES_URL.AcceptElfInvitation}
        element={<AcceptElfInviitationPage />}
      />
    </Route>
  )
);
