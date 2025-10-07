import { apiSlice } from "@/store/slices/apiSlice";
import { TMemberByOrganization } from "@/types/members";

const memberEndpoints = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    viewMembersByOrganization: build.query<
      TMemberByOrganization,
      number | undefined
    >({
      query: (id) => `/organizations/${id}}/members`,
      transformResponse: (response: { data: TMemberByOrganization }) =>
        response.data,
    }),
  }),
});

export const { useViewMembersByOrganizationQuery } = memberEndpoints;
