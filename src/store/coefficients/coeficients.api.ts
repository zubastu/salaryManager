import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getHeaders } from "../employees/employees.api.ts";
import { BASE_URL } from "../../utils/constants.ts";
import { TCoefficient } from "../../types";

export const coefficientsApi = createApi({
  reducerPath: "coefficients/api",
  tagTypes: ["Coefficient"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    updateCoefficients: build.mutation<TCoefficient, TCoefficient>({
      query: (data: TCoefficient) => ({
        url: "/coefficient",
        method: "POST",
        headers: getHeaders(true),
        body: data,
      }),
      invalidatesTags: () => ["Coefficient"],
    }),
    getCoefficients: build.query<TCoefficient, void>({
      query: () => ({
        url: "/coefficient",
        headers: getHeaders(true),
      }),
      providesTags: () => ["Coefficient"],
    }),
  }),
  refetchOnFocus: true,
});

export const { useGetCoefficientsQuery, useUpdateCoefficientsMutation } =
  coefficientsApi;
