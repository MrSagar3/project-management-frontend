import { apiSlice } from "@/store/slices/apiSlice";
import {
  TForgetData,
  TPasswordData,
  TResponse,
  TUser,
  TUserData,
} from "@/types";

const authEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation<TResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    signup: builder.mutation<TUser, TUserData>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),

    resetPassword: builder.mutation<void, TPasswordData>({
      query: ({ email, token, password, password_confirmation }) => ({
        url: "/reset-password",
        method: "POST",
        body: { email, token, password, password_confirmation },
      }),
    }),

    forgetPassword: builder.mutation<TUser, TForgetData>({
      query: (forgetData) => ({
        url: "/forgot-password",
        method: "POST",
        body: forgetData,
      }),
    }),

    resendEmail: builder.mutation<TResponse, void>({
      query: () => ({
        url: "/email/verification/resend",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useResetPasswordMutation,
  useForgetPasswordMutation,
  useResendEmailMutation,
} = authEndpoints;
