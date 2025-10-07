import { apiSlice } from "@/store/slices/apiSlice";

const homeEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationTasks: builder.query({
      query: (organizationId) => ({
        url: `/organizations/${organizationId}/task-reports`,
        method: "GET",
      }),
      providesTags: (result, error, { organizationId }) => [
        { type: "Tasks", id: organizationId },
      ],
    }),
    getOrganizationMembers: builder.query({
      query: (organizationId) => ({
        url: `/organizations/${organizationId}/members`,
        method: "GET",
      }),
      providesTags: (result, error, { organizationId }) => [
        { type: "Members", id: organizationId },
      ],
    }),
    getAllProjectsOrganization: builder.query({
      query: (organizationId) => ({
        url: `/organizations/${organizationId}/projects`,
        method: "GET",
      }),
      providesTags: (result, error, { organizationId }) => [
        { type: "Projects", id: organizationId },
      ],
    }),

    getAllTasksProject: builder.query({
      query: (projectId) => ({
        url: `/projects/${projectId}/tasks`,
        method: "GET",
      }),
      providesTags: (result, error, { organization_id }) => [
        { type: "Tasks", id: organization_id },
      ],
    }),
    getAllTasksOrg: builder.query({
      query: (organization_id) => ({
        url: `/organizations/${organization_id}/tasks`,
        method: "GET",
      }),
      providesTags: (result, error, { organization_id }) => [
        { type: "Tasks", id: organization_id },
      ],
    }),
    getTaskDetails: builder.query({
      query: (page) => ({
        url: `/tasks?page=${page}&per_page=6`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetOrganizationTasksQuery,
  useGetOrganizationMembersQuery,
  useGetAllProjectsOrganizationQuery,
  useGetAllTasksProjectQuery,
  useGetTaskDetailsQuery,
  useGetAllTasksOrgQuery,
} = homeEndpoints;
