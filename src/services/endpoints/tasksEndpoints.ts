import { apiSlice } from "@/store/slices/apiSlice";
import {
  TTasksResponse,
  TTaskStoreRequest,
  TTaskViewResponse,
} from "@/types/tasks";

const taskEndpoints = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TTasksResponse[], number | undefined>({
      query: (id) => `/organizations/${id}/tasks`,
      providesTags: ["Tasks"],
      transformResponse: (response: { data: TTasksResponse[] }) =>
        response.data,
    }),

    updateIndividualTask: build.mutation({
      query: ({ id, taskData }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: taskData,
      }),
      invalidatesTags: [{ type: "Tasks" }],
    }),

    updateTasks: build.mutation({
      query: ({ id, ...taskData }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: taskData,
      }),
      invalidatesTags: [{ type: "Tasks" }],
    }),

    viewTasks: build.query<TTaskViewResponse, number | undefined>({
      query: (id) => `/tasks/${id}`,
      transformResponse: (response: { data: TTaskViewResponse }) =>
        response.data,
      providesTags: (result, error, id) => [{ type: "Tasks", id }],
    }),

    storeTasks: build.mutation<TTasksResponse, TTaskStoreRequest>({
      query: (taskData) => ({
        url: "/tasks",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTasks: build.mutation({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useUpdateTasksMutation,
  useViewTasksQuery,
  useDeleteTasksMutation,
  useStoreTasksMutation,
  useUpdateIndividualTaskMutation,
} = taskEndpoints;
