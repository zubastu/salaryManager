import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "./tasks/tasks.api.ts";
import { authApi } from "./auth/auth.api.ts";
import { sectionFocusSlice } from "./sectionFocusSlice/sectionFocusSlice.ts";

export const store = configureStore({
  reducer: {
    sectionFocusSlice: sectionFocusSlice.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
