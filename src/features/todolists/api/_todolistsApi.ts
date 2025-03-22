import { instance } from '@/common/instance'
import type { BaseResponse } from '@/common/types'
import type { Todolist } from './todolistsApi.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DomainTodolist } from '@/features/todolists/model/todolists-slice.ts'

export const todolistsApi = createApi({
  reducerPath: 'todolistsApi',
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
      transformResponse: (todolists: Todolist[]): DomainTodolist[] => {
        return todolists.map((todolist) => ({ ...todolist, filter: 'all', entityStatus: 'idle' }))
      },
    }),
  }),
})

export const _todolistsApi = {
  // OK but need to add types
  getTodolists() {
    return instance.get<Todolist[]>('todo-lists')
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>('todo-lists', { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
}

export const { useGetTodolistsQuery } = todolistsApi
