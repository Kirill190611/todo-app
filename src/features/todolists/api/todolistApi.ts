import { instance } from '@/common/instance'
import { Todolist } from '@/features/todolists/api/todolistApi.types.ts'
import { BaseResponse } from '@/common/types'

export const todolistApi = {
  getTodolist() {
    return instance.get<Todolist[]>('/todo-lists')
  },
  createTodolist(payload: { title: string }) {
    const { title } = payload
    return instance.post('/todo-lists', { title })
  },
  deleteTodolist(payload: { id: string }) {
    const { id } = payload
    return instance.delete(`/todo-lists/${id}`)
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { title, id } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
}
