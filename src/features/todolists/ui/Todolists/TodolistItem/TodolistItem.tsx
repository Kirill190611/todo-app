import { FilterButtons } from './FilterButtons/FilterButtons'
import { Tasks } from './Tasks/Tasks'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm'
import { useCreateTaskMutation } from '@/features/todolists/api/tasksApi.ts'
import { DomainTodolist } from '@/features/todolists/lib/types'

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const [createTask] = useCreateTaskMutation()

  const addTask = (title: string) => {
    createTask({ todolistId: todolist.id, title })
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={addTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
