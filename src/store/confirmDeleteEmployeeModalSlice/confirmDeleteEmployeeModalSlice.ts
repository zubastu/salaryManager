import { createSlice } from "@reduxjs/toolkit";
type TConfirmDeleteEmployeeModalSlice = {
  selectedEmployeeId: string;
  isOpen: boolean;
};

const initialState: TConfirmDeleteEmployeeModalSlice = {
  selectedEmployeeId: "",
  isOpen: false,
};

export const confirmDeleteEmployeeModalSlice = createSlice({
  name: "confirmDeleteEmployeeModalSlice",
  initialState,
  reducers: {
    openConfirmModalEmployee(state, action) {
      state.selectedEmployeeId = action.payload;
      state.isOpen = true;
    },

    closeConfirmModalEmployee(state) {
      state.selectedEmployeeId = "";
      state.isOpen = false;
    },
  },
});

export const { openConfirmModalEmployee, closeConfirmModalEmployee } =
  confirmDeleteEmployeeModalSlice.actions;
