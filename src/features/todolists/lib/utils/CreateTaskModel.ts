import { DomainTask, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types.ts'

export const CreateTaskModel = (
  task: DomainTask,
  domainModel: Partial<UpdateTaskModel>
): UpdateTaskModel => {
  return {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    ...domainModel,
  }
}
