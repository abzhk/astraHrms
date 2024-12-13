import { apiSlice } from "../apiSlice";

const ASSIGNMENT_URL = "/assign";

export const assignmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAssignment: builder.mutation({
      query: (data) => ({
        url: `${ASSIGNMENT_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    fetchAssignments: builder.query({
      query: () => ({
        url: `${ASSIGNMENT_URL}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    fetchAssignmentsForDeveloper: builder.query({
      query: (developerId) => ({
        url: `${ASSIGNMENT_URL}/developer/${developerId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateAssignmentMutation,
  useFetchAssignmentsQuery,
  useFetchAssignmentsForDeveloperQuery,
} = assignmentApiSlice;
