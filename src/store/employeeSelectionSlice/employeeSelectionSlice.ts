import { createSlice } from "@reduxjs/toolkit";
import { TEmployeeListItem } from "../../types";

type TEmployeeSelectionSlice = {
  selectedEmployee: TEmployeeListItem;
};

const initialState: TEmployeeSelectionSlice = {
  selectedEmployee: {
    id: "",
    name: "",
  },
};

export const employeeSelectionSlice = createSlice({
  name: "sectionFocusSlice",
  initialState,
  reducers: {
    setEmployee(state, action) {
      state.selectedEmployee = action.payload;
    },

    resetEmployee(state) {
      state.selectedEmployee = {
        id: "",
        name: "",
      };
    },
  },
});

export const { setEmployee, resetEmployee } = employeeSelectionSlice.actions;
