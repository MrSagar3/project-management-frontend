import { apiSlice } from "@/store/slices/apiSlice";
import { TComment, TCommentStoreResponse } from "@/types/comment";

const commentEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<TComment[], { taskId: number }>({
      query: ({ taskId }) => `/tasks/${taskId}/comments`,
      transformResponse: (response: { data: TComment[] }) => response.data,
      providesTags: (result, error, { taskId }) => [
        { type: "Comments", id: taskId },
      ],
    }),

    storeComment: builder.mutation<
      TCommentStoreResponse,
      { taskId: number; comment: string }
    >({
      query: ({ taskId, comment }) => ({
        url: `/tasks/${taskId}/comments`,
        method: "POST",
        body: { comment },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Comments", id: taskId },
      ],
    }),

    updateComment: builder.mutation<
      TComment,
      { taskId: number; commentId: number; newComment: string }
    >({
      query: ({ taskId, commentId, newComment }) => ({
        url: `/tasks/${taskId}/comments/${commentId}`,
        method: "PUT",
        body: { comment: newComment },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Comments", id: taskId },
      ],
    }),

    deleteComment: builder.mutation<
      void,
      { taskId: number; commentId: number }
    >({
      query: ({ taskId, commentId }) => ({
        url: `/tasks/${taskId}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Comments", id: taskId },
      ],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useStoreCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentEndpoints;

export default commentEndpoints;
