import { apiSlice } from "@/store/slices/apiSlice";
import { TTasksResponse } from "@/types";

const taskEndpoints = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TTasksResponse, void>({
      query: () => "/tasks",
    }),
    updateTasks: build.mutation({
      query: ({ id, ...taskData }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: taskData,
      }),
    }),
    viewTasks: build.mutation({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: "GET",
      }),
    }),
    storeTasks: build.mutation({
      query: ({ id, ...taskData }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: taskData,
      }),
    }),
    deleteTasks: build.mutation({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useUpdateTasksMutation,
  useViewTasksMutation,
  useDeleteTasksMutation,
  useStoreTasksMutation,
} = taskEndpoints;
