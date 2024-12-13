import { apiSlice } from "../apiSlice";

const USER_URL = "/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  

    profile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
   
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

// profile
    personaldata: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/data`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    
    getPersonaldata: builder.query({
      query: () => ({
        url: `${USER_URL}/getdata`,
        method: "GET",
        credentials: "include",
      }),
    }),
// end



    getEmployeeList: builder.query({
      query: () => ({
        url: `${USER_URL}/get-employee`,
        method: "GET",
        credentials: "include",
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    userAction: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    getNotifications: builder.query({
      query: () => ({
        url: `${USER_URL}/notifications`,
        method: "GET",
        credentials: "include",
      }),
    }),

    markNotiAsRead: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/read-noti?isReadType=${data.type}&id=${data?.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/change-password`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    getManager: builder.query({
      query: () => ({
        url: `${USER_URL}/managerlist`,
        method: "GET",
        credentials: "include",
      }),
    }),

  // Fetch manager by ID
  getManagerById: builder.query({
    query: (id) => ({
      url: `${USER_URL}/managers/${id}`,
      method: "GET",
      credentials: "include",
    }),
  }),
  getManagerById: builder.query({
    query: (id) => ({
      url: `${USER_URL}/managers/${id}`, // Construct the URL using the provided ID
      method: "GET",
      credentials: "include",
    }),
  }),
  

  getDeveloper: builder.query({
    query: () => ({
      url: `${USER_URL}/developerlist`,
      method: "GET",
      credentials: "include",
    }),
  }),


  }),
});

export const {
  useUpdateUserMutation,
  useGetEmployeeListQuery,
  useDeleteUserMutation,
  useUserActionMutation,
  useGetNotificationsQuery,
  useChangePasswordMutation,
  useMarkNotiAsReadMutation,
  useProfileMutation,
  usePersonaldataMutation,
  useGetPersonaldataQuery,
  useGetManagerQuery,
useGetManagerByIdQuery,
useGetDeveloperQuery,
  useGetUserQuery,
} = userApiSlice;
