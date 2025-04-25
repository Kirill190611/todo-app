import type { BaseResponse } from '@/common/types'
import type { Todolist } from './todolistsApi.types'
import { baseApi } from '@/app/baseApi.ts'
import { DomainTodolist } from '@/features/todolists/lib/types'

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => 'todo-lists',
      transformResponse: (todolists: Todolist[]) => {
        return todolists.map((todolist) => ({
          ...todolist,
          filter: 'all',
        }))
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
      async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todolistsApi.util.updateQueryData(
            'getTodolists',
            undefined,
            (state) => {
              const index = state.findIndex((todolist) => todolist.id === id)
              if (index !== -1) {
                state.splice(index, 1)
              }
            }
          )
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ['Todolist'],
    }),
    updateTodolistTitle: builder.mutation<
      BaseResponse,
      { id: string; title: string }
    >({
      query: ({ id, title }) => ({
        url: `todo-lists/${id}`,
        method: 'PUT',
        body: { title },
      }),
      invalidatesTags: ['Todolist'],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi
