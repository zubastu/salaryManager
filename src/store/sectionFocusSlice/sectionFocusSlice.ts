import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFocus: false,
};

export const sectionFocusSlice = createSlice({
  name: "sectionFocusSlice",
  initialState,
  reducers: {
    setToFocus(state) {
      state.isFocus = true;
    },

    reset(state) {
      state.isFocus = false;
    },
  },
});

export const { setToFocus, reset } = sectionFocusSlice.actions;
