import List from '@mui/material/List'
import { DomainTodolist } from '@/features/todolists/model/todolist-slice.ts'
import { TaskItem } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx'
import { useAppSelector } from '@/common/hooks'
import { selectTasks } from '@/features/todolists/model/task-slice.ts'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = (props: Props) => {
  const { todolist } = props
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks

  if (filter === 'active') {
    filteredTasks = todolistTasks.filter((task) => !task.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = todolistTasks.filter((task) => task.isDone)
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>There is no any data</p>
      ) : (
        <List>{filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolistId={id} />)}</List>
      )}
    </>
  )
}
