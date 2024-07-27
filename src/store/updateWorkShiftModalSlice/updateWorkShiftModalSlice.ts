import { createSlice } from "@reduxjs/toolkit";
import { TWorkShift } from "../../types";
type TUpdateWorkShiftModalSlice = {
  selectedWorkShift: TWorkShift;
  isOpen: boolean;
};

const initialData = {
  id: "",
  date: "",
  gain: 0,
  workHours: 0,
  salary: 0,
  cash: 0,
  costs: 0,
  cash_in_case: 0,
  isNightShift: false,
  user_id: "",
  createdAt: "",
  updatedAt: "",
  user: {
    id: "",
    username: "",
    name: "",
    role_id: 0,
  },
};

const initialState: TUpdateWorkShiftModalSlice = {
  selectedWorkShift: initialData,
  isOpen: false,
};

export const updateWorkShiftModalSlice = createSlice({
  name: "updateWorkShiftModalSlice",
  initialState,
  reducers: {
    openUpdateWorkShiftModal(state, action) {
      state.selectedWorkShift = action.payload;
      state.isOpen = true;
    },

    closeUpdateWorkShiftModal(state) {
      state.selectedWorkShift = initialData;
      state.isOpen = false;
    },
  },
});

export const { openUpdateWorkShiftModal, closeUpdateWorkShiftModal } =
  updateWorkShiftModalSlice.actions;
