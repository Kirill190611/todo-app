export type DomainTask = {
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTasksResponse = {
  error: string | null
  items: DomainTask[]
  totalCount: number
}

export type PostTasksResponse = {
  data: { item: DomainTask }
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}

export type UpdateTaskModel = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}
