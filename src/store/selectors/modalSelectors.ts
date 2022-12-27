import { Selector } from "react-redux";
import { RootState } from "../store";

export const getModalIsOpen: Selector<RootState, boolean> = (state) =>
  state.modal.isModalOpen;
