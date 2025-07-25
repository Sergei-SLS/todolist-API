import { baseApi } from "@/features/todolists/api/baseApi.ts"
import { BaseResponse } from "@/common/types"
import { LoginInputs } from "@/features/features/auth/lib/schemas"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => "auth/me",
    }),
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        url: "auth/login",
        method: "DELETE",
      }),
    }),
    getCaptcha: build.query<{ url: string }, void>({
      query: () => ({
        url: "/security/get-captcha-url",
        method: "GET",
      }),
    }),
  }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation, useGetCaptchaQuery } = authApi
