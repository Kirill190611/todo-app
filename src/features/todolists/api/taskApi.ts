import { instance } from '@/common/instance'
import { DomainTask, GetTasksResponse, UpdateTaskModel } from '@/features/todolists/api/taskApi.types.ts'
import { BaseResponse } from '@/common/types'

export const taskApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { title, todolistId } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  changeTaskStatus(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { model, todolistId, taskId } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, { model })
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { taskId, todolistId } = payload
    return instance.delete<BaseResponse<{ item: DomainTask }>>(` /todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTaskTitle(payload: { todolistId: string; taskId: string; title: string }) {
    const { taskId, todolistId, title } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, { title })
  },
}
