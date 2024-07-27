import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants.ts";
import { TWorkShift, TWorkShiftProperties } from "../../types";
import { getHeaders } from "../employees/employees.api.ts";

export const workShiftsApi = createApi({
  reducerPath: "workShifts/api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["WorkShiftsHistory", "WorkShiftsEmployee", "CountCase"],
  endpoints: (build) => ({
    getAllWorkShifts: build.query<TWorkShift[], void>({
      query: () => ({
        url: "/work_shifts",
        headers: getHeaders(true),
      }),
      providesTags: () => ["WorkShiftsHistory"],
    }),

    getEmployeeWorkShifts: build.query<TWorkShift[], string>({
      query: (employee_id) => ({
        url: `/work_shifts/${employee_id}`,
        headers: getHeaders(true),
      }),
      providesTags: () => ["WorkShiftsEmployee"],
    }),

    getEmployeeWorkShiftsBetweenDates: build.query<TWorkShift[], any>({
      query: (data) => ({
        url: `/work_shifts/${data.user_id}/dates`,
        body: { startDate: data.startDate, endDate: data.endDate },
        method: "POST",
        headers: getHeaders(true),
      }),
      providesTags: () => ["WorkShiftsEmployee"],
    }),

    getAllWorkShiftsBetweenDates: build.query<TWorkShift[], any>({
      query: (data) => ({
        url: "/work_shifts/dates",
        body: { startDate: data.startDate, endDate: data.endDate },
        method: "POST",
        headers: getHeaders(true),
      }),
      providesTags: () => ["CountCase"],
    }),

    postWorkShift: build.mutation<TWorkShift[], TWorkShiftProperties>({
      query: (data) => ({
        url: "/work_shifts",
        headers: getHeaders(true),
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => ["WorkShiftsHistory"],
    }),

    updateWorkShift: build.mutation<
      TWorkShift[],
      { data: TWorkShiftProperties; workShiftId: string }
    >({
      query: ({ data, workShiftId }) => ({
        url: `/work_shifts/${workShiftId}`,
        headers: getHeaders(true),
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: () => [
        "WorkShiftsHistory",
        "WorkShiftsEmployee",
        "CountCase",
      ],
    }),

    deleteWorkShift: build.mutation<TWorkShift[], string>({
      query: (id) => ({
        url: `/work_shifts/${id}`,
        headers: getHeaders(true),
        method: "DELETE",
      }),
      invalidatesTags: () => ["WorkShiftsHistory"],
    }),
  }),
  refetchOnFocus: true,
});

export const {
  useGetAllWorkShiftsQuery,
  usePostWorkShiftMutation,
  useDeleteWorkShiftMutation,
  useUpdateWorkShiftMutation,
  useLazyGetEmployeeWorkShiftsBetweenDatesQuery,
  useLazyGetAllWorkShiftsBetweenDatesQuery,
} = workShiftsApi;
