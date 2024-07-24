import { createSlice } from "@reduxjs/toolkit";

type TNavigationPopupSlice = {
  isOpen: boolean;
};

const initialState: TNavigationPopupSlice = {
  isOpen: false,
};

export const navigationPopupSlice = createSlice({
  name: "navigationPopupSlice",
  initialState,
  reducers: {
    openNavModal(state) {
      state.isOpen = true;
    },

    closeNavModal(state) {
      state.isOpen = false;
    },
  },
});

export const { openNavModal, closeNavModal } = navigationPopupSlice.actions;
