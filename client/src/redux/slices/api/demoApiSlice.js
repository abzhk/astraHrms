
import { apiSlice } from "../apiSlice";

const DEMO_URL = "/demo"

export const demoApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

      createStudent:builder.mutation({
            query:(data)=>({
               url:`${DEMO_URL}/create`,
             method:'POST',
             body: data,
             credentials:'include',
          }),
        }),

        fetchStudents: builder.query({
          query: () => ({
             url: `${DEMO_URL}/students`, 
             method: 'GET',
             credentials: 'include',
          }),
    }),



})
})
export const {
   useCreateStudentMutation,
   useFetchStudentsQuery,
   } = demoApiSlice;


