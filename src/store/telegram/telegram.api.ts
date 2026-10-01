import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getHeaders } from "../employees/employees.api.ts";
import { BASE_URL } from "../../utils/constants.ts";
type TelegramMessage = { message: string };

export const telegramApi = createApi({
  reducerPath: "telegram/api",
  tagTypes: ["Telegram"],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    sendToTelegram: build.mutation<unknown, TelegramMessage>({
      query: (data) => ({
        url: "/telegram-bot",
        method: "POST",
        headers: getHeaders(true),
        body: data,
      }),
      invalidatesTags: () => ["Telegram"],
    }),
  }),
});

export const { useSendToTelegramMutation } = telegramApi;
