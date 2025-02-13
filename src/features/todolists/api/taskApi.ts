import { instance } from '@/common/instance'
import { GetTasksResponse, PostTasksResponse, UpdateTaskModel } from '@/features/todolists/api/taskApi.types.ts'

export const taskApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { title, todolistId } = payload
    return instance.post<PostTasksResponse>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  changeTaskStatus(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { model, todolistId, taskId } = payload
    return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, { model })
  },
}
