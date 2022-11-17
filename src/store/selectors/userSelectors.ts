import { Selector } from "@reduxjs/toolkit";
import { IUser } from "../../types";
import { RootState } from "../store";

export const getUser: Selector<RootState, IUser | null> = (state) =>
  state.user.user;
export const getUserError: Selector<RootState, string | null> = (state) =>
  state.user.error;
export const getUserIsLoading: Selector<RootState, boolean> = (state) =>
  state.user.isLoading;
export const getUserIsLoggedIn: Selector<RootState, boolean> = (state) =>
  state.user.isLoggedIn;
