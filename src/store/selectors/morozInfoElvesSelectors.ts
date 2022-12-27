import { Selector } from "@reduxjs/toolkit";
import { IElf } from "../../types";
import { IElvesRequestData } from "../features";
import { RootState } from "../store";

export const getMorozInfoElves: Selector<RootState, IElf[] | null> = (state) =>
  state.morozInfoElves.elves;

export const getMorozInfoElvesTotalPages: Selector<RootState, number | null> = (
  state
) => state.morozInfoElves.totalPages;

export const getMorozInfoElvesTotalRecords: Selector<
  RootState,
  number | null
> = (state) => state.morozInfoElves.totalRecords;

export const getMorozInfoElvesLoading: Selector<RootState, boolean> = (state) =>
  state.morozInfoElves.isLoading;

export const getMorozInfoElvesError: Selector<RootState, string | null> = (
  state
) => state.morozInfoElves.error;

export const getMorozInfoElvesRequestParams: Selector<
  RootState,
  IElvesRequestData
> = (state) => state.morozInfoElves.requestData;

export const getMorozInfoElvesMessage: Selector<RootState, string | null> = (
  state
) => state.morozInfoElves.message;
