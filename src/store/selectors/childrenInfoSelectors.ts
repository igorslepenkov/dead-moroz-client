import { Selector } from "@reduxjs/toolkit";
import { GetChildrenOptions, IApiChild, IFullChildInfo } from "../../types";
import { RootState } from "../store";

export const getChildrenInfo: Selector<RootState, IApiChild[] | null> = (
  state
) => state.childrenInfo.children;

export const getChildrenInfoIsLoading: Selector<RootState, boolean> = (state) =>
  state.childrenInfo.isLoading;

export const getChildrenInfoError: Selector<RootState, string | null> = (
  state
) => state.childrenInfo.error;

export const getChildrenInfoTotalPages: Selector<RootState, number | null> = (
  state
) => state.childrenInfo.totalPages;
export const getChildrenInfoTotalRecords: Selector<RootState, number | null> = (
  state
) => state.childrenInfo.totalRecords;
export const getChildrenInfoRequestData: Selector<
  RootState,
  GetChildrenOptions
> = (state) => state.childrenInfo.requestData;
