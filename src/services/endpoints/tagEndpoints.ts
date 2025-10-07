import { apiSlice } from "@/store/slices/apiSlice";
import { TTag, TTagStoreResponse } from "@/types/tag";

const tagEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<TTag[], { taskId: number | undefined }>({
      query: ({ taskId }) => `/tasks/${taskId}/tags`,
      transformResponse: (response: { data: TTag[] }) => response.data,
      providesTags: (result, error, { taskId }) => [
        { type: "Tags", id: taskId },
      ],
    }),

    storeTag: builder.mutation<
      TTagStoreResponse,
      { taskId: number; label: string }
    >({
      query: ({ taskId, label }) => ({
        url: `/tasks/${taskId}/tags`,
        method: "POST",
        body: { label },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tags", id: taskId },
      ],
    }),

    viewTagById: builder.query<TTag, { taskId: number; tagId: number }>({
      query: ({ taskId, tagId }) => `/tasks/${taskId}/tags/${tagId}`,
      transformResponse: (response: { data: TTag }) => response.data,
      providesTags: (result, error, { taskId }) => [
        { type: "Tags", id: taskId },
      ],
    }),

    deleteTag: builder.mutation<void, { taskId: number; tagId: number }>({
      query: ({ taskId, tagId }) => ({
        url: `/tasks/${taskId}/tags/${tagId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tags", id: taskId },
      ],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useStoreTagMutation,
  useViewTagByIdQuery,
  useDeleteTagMutation,
} = tagEndpoints;

export default tagEndpoints;
