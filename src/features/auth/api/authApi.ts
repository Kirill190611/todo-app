import { LoginArgs } from '@/features/auth/api/authApi.types.ts'
import { instance } from '@/common/instance'
import { BaseResponse } from '@/common/types'
import { baseApi } from '@/app/baseApi.ts'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => `auth/me`,
    }),
    login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
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

export const _authApi = {
  //OK (need to delete)
  login(payload: LoginArgs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>(`auth/login`, payload)
  },
  //OK (need to delete)
  logout() {
    return instance.delete<BaseResponse>(`auth/login`)
  },
  //OK (need to delete)
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>(`auth/me`)
  },
}
