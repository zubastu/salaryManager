import { createSlice } from "@reduxjs/toolkit";
type TConfirmDeleteWorkShiftModalSlice = {
  selectedWorkShiftId: string;
  isOpen: boolean;
};

const initialState: TConfirmDeleteWorkShiftModalSlice = {
  selectedWorkShiftId: "",
  isOpen: false,
};

export const confirmDeleteWorkShiftModalSlice = createSlice({
  name: "confirmDeleteWorkShiftModalSlice",
  initialState,
  reducers: {
    openConfirmModalShift(state, action) {
      state.selectedWorkShiftId = action.payload;
      state.isOpen = true;
    },

    closeConfirmModalShift(state) {
      state.selectedWorkShiftId = "";
      state.isOpen = false;
    },
  },
});

export const { openConfirmModalShift, closeConfirmModalShift } =
  confirmDeleteWorkShiftModalSlice.actions;
