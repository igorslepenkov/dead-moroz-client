import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isModalOpen: boolean;
}

const initialState: InitialState = {
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export default modalSlice.reducer;

export const toggleModal = modalSlice.actions.toggleModal;
