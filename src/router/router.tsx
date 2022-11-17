import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import { ROUTES_URL } from "./routes";

import { App } from "../App";
import { HomePage } from "../pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES_URL.HOME} element={<App />}>
      <Route index element={<HomePage />} />
    </Route>
  )
);
