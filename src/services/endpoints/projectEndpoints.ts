import { apiSlice } from "@/store/slices/apiSlice";
import { TProject } from "@/types/projects";

const projectEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<TProject[], void>({
      query: () => "/projects",
      transformResponse: (response: { data: TProject[] }) => response.data,
      providesTags: [{ type: "Projects" }],
    }),
    getProjectById: builder.query<TProject, string>({
      query: (projectId) => `/projects/${projectId}`,
      transformResponse: (response: { data: TProject }) => response.data,
      providesTags: (result, error, id) => [{ type: "Projects", id }],
    }),
    storeProject: builder.mutation({
      query: (newProject) => ({
        url: "/projects",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: [{ type: "Projects" }],
    }),
    updateProject: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: [{ type: "Projects" }],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useStoreProjectMutation,
  useUpdateProjectMutation,
} = projectEndpoints;

export default projectEndpoints;
