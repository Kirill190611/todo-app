import { instance } from '@/common/instance'
import type { BaseResponse } from '@/common/types'
import type { Todolist } from './todolistsApi.types'
import { DomainTodolist } from '@/features/todolists/model/todolists-slice.ts'
import { baseApi } from '@/app/baseApi.ts'

export const todolistsApi = baseApi.injectEndpoints({
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
