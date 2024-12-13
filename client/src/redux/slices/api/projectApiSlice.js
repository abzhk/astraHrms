import { apiSlice } from "../apiSlice";

const PROJECT_URL = "/project";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  

    createProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getAllProjects: builder.query({
        query: () => ({
          url: `${PROJECT_URL}/get`,
          method: "GET",
          credentials: "include",
        }),
      }),
   
      getProjectsByManagerId: builder.query({
        query: (managerId) => ({
          url: `${PROJECT_URL}/passone/${managerId}`, 
          method: "GET",
          credentials: "include",
        }),
      }),

  }),
});

export const {
 useCreateProjectMutation,
 useGetAllProjectsQuery,
useGetProjectsByManagerIdQuery,

} = projectApiSlice;
