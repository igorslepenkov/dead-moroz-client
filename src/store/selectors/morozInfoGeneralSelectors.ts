import { Selector } from "@reduxjs/toolkit";
import { IMorozInfoGeneral } from "../../types";
import { RootState } from "../store";

export const getMorozInfoGeneral: Selector<
  RootState,
  IMorozInfoGeneral | null
> = (state) => state.morozInfoGeneral.info;
export const getMorozInfoGeneralLoading: Selector<RootState, boolean> = (
  state
) => state.morozInfoGeneral.isLoading;
export const getMorozInfoGeneralError: Selector<RootState, string | null> = (
  state
) => state.morozInfoGeneral.error;
