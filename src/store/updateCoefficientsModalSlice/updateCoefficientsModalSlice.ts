import { createSlice } from "@reduxjs/toolkit";

type TUpdateCoefficientsModalSlice = {
  isOpen: boolean;
};

const initialState: TUpdateCoefficientsModalSlice = {
  isOpen: false,
};

export const updateCoefficientsModalSlice = createSlice({
  name: "updateCoefficientsSlice",
  initialState,
  reducers: {
    openUpdateCoefficientsModal(state) {
      state.isOpen = true;
    },

    closeUpdateCoefficientsModal(state) {
      state.isOpen = false;
    },
  },
});

export const { openUpdateCoefficientsModal, closeUpdateCoefficientsModal } =
  updateCoefficientsModalSlice.actions;
