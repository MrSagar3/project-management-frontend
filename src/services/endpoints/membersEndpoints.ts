import { apiSlice } from "@/store/slices/apiSlice";
import { TMember } from "@/types/members";

const membersEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMemberByOrganization: builder.query<
      TMember[],
      {
        organization_id: string;
        userToken: string;
      }
    >({
      query: ({ organization_id, userToken }) => ({
        url: `/organizations/${organization_id}/members`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
      transformResponse: (response: { data: TMember[] }) => response.data,
      providesTags: (result, error, { organization_id }) => [
        { type: "Members", id: organization_id },
      ],
    }),
  }),
});

export const { useGetMemberByOrganizationQuery } = membersEndpoints;

export default membersEndpoints;
