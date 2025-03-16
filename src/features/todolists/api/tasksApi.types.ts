import { TaskPriority, TaskStatus } from '@/common/enums/enums'
import { z } from 'zod'

export const DomainTaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.string(),
})

export const UpdateTaskModelSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
})

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type DomainTask = z.infer<typeof DomainTaskSchema>
export type UpdateTaskModel = z.infer<typeof UpdateTaskModelSchema>
