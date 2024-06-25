import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { getHeaders } from "../tasks/tasks.api.ts";
import { TLogin } from "../../types";
import { BASE_URL } from "../../utils/constants.ts";

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

type TUserResponse = {
  username: string;
  id: string;
  accessToken: string;
};

export const authApi = createApi({
  reducerPath: "auth/api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }) as BaseQueryFn<string | FetchArgs, unknown, TCustomError, {}>,
  endpoints: (build) => ({
    login: build.mutation<TUserResponse, TLogin>({
      query: (data: TLogin) => ({
        url: "/login",
        method: "POST",
        headers,
        body: data,
      }),
    }),
    getUserData: build.query<TUserResponse, void>({
      query: () => ({
        url: "/users/me",
        headers: getHeaders(),
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserDataQuery } = authApi;
