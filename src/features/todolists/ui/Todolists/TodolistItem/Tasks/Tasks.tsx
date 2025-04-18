import { TaskStatus } from '@/common/enums'
import { TaskItem } from './TaskItem/TaskItem'
import List from '@mui/material/List'
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi.ts'
import { TasksSkeleton } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx'
import { DomainTodolist } from '@/features/todolists/lib/types'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const { data: tasks, isLoading } = useGetTasksQuery({
    todolistId: id,
    params: { count: 4, page: 1 },
  })

  let todolistTasks = tasks?.items

  if (filter === 'active') {
    todolistTasks = todolistTasks?.filter(
      (task) => task.status === TaskStatus.New
    )
  }
  if (filter === 'completed') {
    todolistTasks = todolistTasks?.filter(
      (task) => task.status === TaskStatus.Completed
    )
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {todolistTasks?.length === 0 ? (
        <p>There are absent any data.</p>
      ) : (
        <List>
          {todolistTasks?.map((task) => (
            <TaskItem key={task.id} task={task} todolist={todolist} />
          ))}
        </List>
      )}
    </>
  )
}
