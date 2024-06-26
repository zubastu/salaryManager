import { configureStore } from "@reduxjs/toolkit";
import { employeesApi } from "./employees/employees.api.ts";
import { authApi } from "./auth/auth.api.ts";
import { employeeSelectionSlice } from "./employeeSelectionSlice/employeeSelectionSlice.ts";
import { workShiftsApi } from "./workShifts/workShifts.api.ts";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    selectedEmployee: employeeSelectionSlice.reducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
    [workShiftsApi.reducerPath]: workShiftsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      employeesApi.middleware,
      authApi.middleware,
      workShiftsApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;