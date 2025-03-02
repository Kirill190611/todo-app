import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm.tsx'
import { createTaskTC } from '@/features/todolists/model/task-slice.ts'
import { TodolistTitle } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx'
import { Tasks } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx'
import { FilterButtons } from '@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx'
import { useAppDispatch } from '@/common/hooks'
import { DomainTodolist } from '@/features/todolists/model/todolist-slice.ts'

export type TodolistItemProps = {
  todolist: DomainTodolist
}

export const TodolistItem = (props: TodolistItemProps) => {
  const { todolist } = props
  const { id } = todolist

  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskTC({ todolistId: id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
