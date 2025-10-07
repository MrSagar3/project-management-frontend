import { apiSlice } from "@/store/slices/apiSlice";
import { TInvite } from "@/types/invite";

const inviteEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvites: builder.query<TInvite[], void>({
      query: () => "/invitations",
      transformResponse: (response: { data: TInvite[] }) => response.data,
      providesTags: [{ type: "Invites" }],
    }),

    storeInvite: builder.mutation({
      query: (newInvite) => ({
        url: "/invitations",
        method: "POST",
        body: newInvite,
        invalidatesTags: [{ type: "Invites" }],
      }),
    }),
  }),
});

export const { useGetInvitesQuery, useStoreInviteMutation } = inviteEndpoints;

export default inviteEndpoints;
