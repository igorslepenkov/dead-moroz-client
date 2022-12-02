import { Selector } from "@reduxjs/toolkit";
import { IFullChildInfo } from "../../types";
import { RootState } from "../store";

export const getChildInfo: Selector<RootState, IFullChildInfo | null> = (
  state
) => state.childInfo.childInfo;

export const getChildInfoIsLoading: Selector<RootState, boolean> = (state) =>
  state.childInfo.isLoading;

export const getChildInfoError: Selector<RootState, string | null> = (state) =>
  state.childInfo.error;

export const getChildInfoServerMessage: Selector<RootState, string | null> = (
  state
) => state.childInfo.message;
