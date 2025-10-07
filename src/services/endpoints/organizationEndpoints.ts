import { apiSlice } from "@/store/slices/apiSlice";
import {
  TOrganization,
  TOrganizationStoreResponse,
} from "@/types/organization";
import { TProject, TProjectByOrg } from "@/types/project";

const organizationEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query<TOrganization[], void>({
      query: () => "/organizations",
      transformResponse: (response: { data: TOrganization[] }) => response.data,
      providesTags: [{ type: "Organizations" }],
    }),

    viewOrganizationById: builder.query<TOrganization, number | undefined>({
      query: (organizationId) => `/organizations/${organizationId}`,
      transformResponse: (response: { data: TOrganization }) => response.data,
      providesTags: (result, error, id) => [{ type: "Organizations", id }],
    }),

    storeOrganization: builder.mutation<TOrganizationStoreResponse, FormData>({
      query: (formData) => ({
        url: "/organizations",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Organizations" }],
    }),
    updateOrganization: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/organizations/${id}`,
        method: "POST",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Organizations" },
        { type: "Projects", id },
      ],
    }),

    deleteOrganization: builder.mutation<void, number>({
      query: (organizationId) => ({
        url: `/organizations/${organizationId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Organizations", id }],
    }),

    getProjectsByOrg: builder.query<
      TProjectByOrg,
      { organizationId: number | undefined; userToken: string | null }
    >({
      query: ({ organizationId, userToken }) => ({
        url: `/organizations/${organizationId}/projects`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
      transformResponse: (response: { data: TProjectByOrg }) => response.data,
      providesTags: (result, error, { organizationId }) => [
        { type: "Projects", id: organizationId },
      ],
    }),

    getProjectsByOrganization: builder.query<
      TProject[],
      { organizationId: string; userToken: string }
    >({
      query: ({ organizationId, userToken }) => ({
        url: `/organizations/${organizationId}/projects`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
      transformResponse: (response: { data: TProject[] }) => response.data,
      providesTags: (result, error, { organizationId }) => [
        { type: "Projects", id: organizationId },
      ],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useViewOrganizationByIdQuery,
  useStoreOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
  useGetProjectsByOrganizationQuery,
  useGetProjectsByOrgQuery,
} = organizationEndpoints;

export default organizationEndpoints;
