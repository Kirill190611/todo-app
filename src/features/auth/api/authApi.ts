import { LoginArgs } from '@/features/auth/api/authApi.types.ts'
import { BaseResponse } from '@/common/types'
import { baseApi } from '@/app/baseApi.ts'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<
      BaseResponse<{ id: number; email: string; login: string }>,
      void
    >({
      query: () => `auth/me`,
    }),
    login: builder.mutation<
      BaseResponse<{ userId: number; token: string }>,
      LoginArgs
    >({
      query: (args) => ({
        url: `auth/login`,
        method: 'POST',
        body: args,
      }),
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: `auth/login`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi
