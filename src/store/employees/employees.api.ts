import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants.ts";
import {
  Employee,
  TEmployee,
  TEmployeeForm,
  TEmployeeFormWithId,
} from "../../types";
import { workShiftsApi } from "../workShifts/workShifts.api.ts";

export const getHeaders = (withToken: boolean = false): HeadersInit => {
  const token = localStorage.getItem("token");
  return withToken
    ? {
        "Content-Type": "application/json",
        Accept: "application/json: charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "x-access-token": `${token}`,
      }
    : {
        "Content-Type": "application/json",
        Accept: "application/json: charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      };
};

export const employeesApi = createApi({
  reducerPath: "employees/api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Employees"],
  endpoints: (build) => ({
    getEmployees: build.query<TEmployee[], void>({
      query: () => ({
        url: "/employee",
        headers: getHeaders(),
      }),
      providesTags: () => ["Employees"],
    }),

    createEmployee: build.mutation<Employee, TEmployeeForm>({
      query: (data) => ({
        url: "/employee",
        headers: getHeaders(true),
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employees"],
    }),

    updateEmployeeParams: build.mutation<any, TEmployeeFormWithId>({
      query: (data) => {
        return {
          url: `/employee/${data.id}`,
          headers: getHeaders(true),
          method: "PATCH",
          body: { name: data.name },
        };
      },
      invalidatesTags: ["Employees"],
    }),

    deleteEmployee: build.mutation<any, string>({
      query: (id) => {
        return {
          url: `/employee/${id}`,
          headers: getHeaders(true),
          method: "DELETE",
        };
      },
      invalidatesTags: ["Employees"],
      onCacheEntryAdded: (_, { dispatch }) => {
        dispatch(workShiftsApi.util.invalidateTags(["WorkShiftsHistory"]));
      },
    }),
  }),
  refetchOnFocus: true,
});

export const {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
  useCreateEmployeeMutation,
  useUpdateEmployeeParamsMutation,
} = employeesApi;
