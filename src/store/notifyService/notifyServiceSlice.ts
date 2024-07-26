import { createSlice } from "@reduxjs/toolkit";

type TNotifyServiceSlice = {
  isOpen: boolean;
  message: string;
};

const initialState: TNotifyServiceSlice = {
  isOpen: false,
  message: "",
};

export const notifyServiceSlice = createSlice({
  name: "notifyServiceSlice",
  initialState,
  reducers: {
    showNotify(state, action) {
      state.isOpen = true;
      state.message = action.payload;
    },

    hideNotify(state) {
      state.isOpen = false;
      state.message = "";
    },
  },
});

export const { showNotify, hideNotify } = notifyServiceSlice.actions;
