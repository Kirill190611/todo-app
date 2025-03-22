import { instance } from '@/common/instance'
import type { BaseResponse } from '@/common/types'
import type { Todolist } from './todolistsApi.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DomainTodolist } from '@/features/todolists/model/todolists-slice.ts'

export const todolistsApi = createApi({
  reducerPath: 'todolistsApi',
  tagTypes: ['Todolist'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('API-KEY', `${import.meta.env.VITE_API_KEY}`)
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`)
    },
  }),
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => 'todo-lists',
      transformResponse: (todolists: Todolist[]) => {
        return todolists.map((todolist) => ({ ...todolist, filter: 'all', entityStatus: 'idle' }))
      },
      providesTags: ['Todolist'],
    }),
    createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: 'todo-lists',
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Todolist'],
    }),
    removeTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `todo-lists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todolist'],
    }),
    updateTodolistTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `todo-lists/${id}`,
        method: 'PUT',
        body: { title },
      }),
      invalidatesTags: ['Todolist'],
    }),
  }),
})

export const _todolistsApi = {
  // OK (Need to delete)
  getTodolists() {
    return instance.get<Todolist[]>('todo-lists')
  },
  // OK (Need to delete)
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>('todo-lists', { title })
  },
  // OK (Need to delete)
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
  // OK (Need to delete)
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },
}

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi
