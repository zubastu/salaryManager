import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants.ts";

export const getHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json: charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    authorization: `Bearer ${token}`,
  };
};

export const tasksApi = createApi({
  reducerPath: "tasks/api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Completed", "Staged"],
  endpoints: (build) => ({
    getCompletedTasks: build.query<any, void>({
      query: () => ({
        url: "/tasks/completed",
        headers: getHeaders(),
      }),
      providesTags: () => ["Completed"],
    }),

    getStagedTasks: build.query<any, void>({
      query: () => ({
        url: "/tasks/staged",
        headers: getHeaders(),
      }),
      providesTags: () => ["Staged"],
    }),

    createTask: build.mutation<any, any>({
      query: (data: any) => ({
        url: "/tasks",
        headers: getHeaders(),
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staged"],
    }),

    completeTask: build.mutation<any, any>({
      query: (task) => {
        const id = task._id;
        delete task._id;
        return {
          url: `/tasks/${id}`,
          headers: getHeaders(),
          method: "PATCH",
          body: task,
        };
      },
      invalidatesTags: ["Completed", "Staged"],
    }),

    updateTaskStaged: build.mutation<any, any>({
      query: (task) => {
        const id = task._id;
        delete task._id;
        return {
          url: `/tasks/${id}`,
          headers: getHeaders(),
          method: "PATCH",
          body: task,
        };
      },
      invalidatesTags: ["Staged"],
    }),
  }),
});

export const {
  useLazyGetCompletedTasksQuery,
  useLazyGetStagedTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStagedMutation,
  useCompleteTaskMutation,
} = tasksApi;
