import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { getHeaders } from "../employees/employees.api.ts";
import { BASE_URL } from "../../utils/constants.ts";
import { TCoefficient } from "../../types";

const headers: HeadersInit = {
  "Content-Type": "application/json",
  Accept: "application/json: charset=utf-8",
  "Access-Control-Allow-Origin": "*",
};

type TCustomError = {
  data: {
    message: string;
  };
  status: number;
};

export const coefficientsApi = createApi({
  reducerPath: "coefficients/api",
  tagTypes: ["Coefficient"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }) as BaseQueryFn<string | FetchArgs, unknown, TCustomError, {}>,
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
        headers,
      }),
      providesTags: () => ["Coefficient"],
    }),
  }),
  refetchOnFocus: true,
});

export const { useGetCoefficientsQuery, useUpdateCoefficientsMutation } =
  coefficientsApi;
