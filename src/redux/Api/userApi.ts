import ChangePassword from "@/components/changePassword/ChangePassword";
import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
  overrideExisting: true, // This allows overriding existing endpoints

  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },

      invalidatesTags: ["logIn", "AllDestination", "User"],
    }),
    registerUser: build.mutation({
      query: (data: any) => {
        return {
          url: "/users/register",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllDestination", "Destination", "AllDestination"],
    }),

    forgotUser: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: data,
        };
      },
    }),
    otpUser: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/verify-forgot-password",
          method: "POST",
          body: data,
        };
      },
    }),
    resetPass: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: data,
        };
      },
    }),
    updateByUser: build.mutation({
      query: (data: any) => {
        return {
          url: "/users/profile",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["AllDestination", "Destination", "AllDestination"],
    }),

    // Active Bussiness Type
    allUser: build.query<any, void>({
      query: () => "/users/active-bussines-type",
      providesTags: ["User", "Destination"],
    }),
    getUser: build.query({
      query: () => {
        return {
          url: "/auth/profile",
          method: "GET",
        };
      },
      providesTags: ["User", "Payments", "Destination", "AllDestination"],
    }),
    getUserById: build.query({
      query: (id) => {
        return {
          url: `/users/user/${id}`,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "User", id }], // Dynamic tagging for specific user ID
    }),
    changePassword: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/change-password",
          method: "PUT",
          body: data,
        };
      },
    }),

    contact: build.mutation({
      query: (data: any) => {
        return {
          url: "/users/contact-us",
          method: "POST",
          body: data,
        };
      },
    }),
    verifySix: build.query({
      query: () => {
        return {
          url: `/users?page=1&limit=10&summitVerify=true`, // Fixed query parameters
          method: "GET",
        };
      },
      providesTags: ["User", "AllDestination"],
    }),

    updateUserBio: build.mutation({
      query: (data: any) => {
        return {
          url: `/users/edit-bio/${data.id}`,
          method: "PUT",
          body: { bio: data.bio },
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgotUserMutation,
  useOtpUserMutation,
  useResetPassMutation,
  useUpdateByUserMutation,
  useChangePasswordMutation,
  useAllUserQuery,
  useGetUserQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useContactMutation,
  useVerifySixQuery,
  useUpdateUserBioMutation,
} = userApi;
