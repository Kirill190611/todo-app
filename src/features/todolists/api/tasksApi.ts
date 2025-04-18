import { instance } from '@/common/instance'
import type { BaseResponse } from '@/common/types'
import type {
  DomainTask,
  GetTasksResponse,
  UpdateTaskModel,
} from './tasksApi.types'
import { baseApi } from '@/app/baseApi.ts'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, string>({
      query: (todolistId) => `todo-lists/${todolistId}/tasks`,
      // providesTags: ['Task'],
      providesTags: (res, _error, todolistId) =>
        res
          ? [
              ...res.items.map(({ id }) => ({ type: 'Task', id }) as const),
              { type: 'Task', id: todolistId },
            ]
          : [{ type: 'Task' }],
    }),
    createTask: builder.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; title: string }
    >({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: (_res, _error, { todolistId }) => [
        { type: 'Task', id: todolistId },
      ],
    }),
    removeTask: builder.mutation<
      BaseResponse,
      { todolistId: string; taskId: string }
    >({
      query: ({ todolistId, taskId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _error, { taskId }) => [
        { type: 'Task', id: taskId },
      ],
    }),
    updateTask: builder.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: model,
      }),
      invalidatesTags: (_res, _error, { taskId }) => [
        { type: 'Task', id: taskId },
      ],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useRemoveTaskMutation,
  useUpdateTaskMutation,
} = tasksApi

export const _tasksApi = {
  // OK (need to delete)
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  // OK (need to delete)
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(
      `todo-lists/${todolistId}/tasks`,
      {
        title,
      }
    )
  },
  // OK (need to delete)
  updateTask(payload: {
    todolistId: string
    taskId: string
    model: UpdateTaskModel
  }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    )
  },
  // OK (need to delete)
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponse>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    )
  },
}
