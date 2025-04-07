import { TaskStatus } from '@/common/enums'
import type { DomainTodolist } from '@/features/todolists/model/todolists-slice'
import { TaskItem } from './TaskItem/TaskItem'
import List from '@mui/material/List'
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi.ts'
import { TasksSkeleton } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx'
import { useAppDispatch } from '@/common/hooks'
import { setAppErrorAC } from '@/app/app-slice.ts'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const { data: tasks, isLoading, error } = useGetTasksQuery(id)

  const dispatch = useAppDispatch()

  let todolistTasks = tasks?.items

  if (filter === 'active') {
    todolistTasks = todolistTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === 'completed') {
    todolistTasks = todolistTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  if (error) {
    if ('status' in error) {
      const errorMessage = 'error' in error ? error.error : JSON.stringify(error.data)
      dispatch(setAppErrorAC({ error: JSON.stringify(errorMessage) }))
    } else {
      dispatch(setAppErrorAC({ error: error.message || 'Oops. Some error occurred' }))
    }
  }

  return (
    <>
      {todolistTasks?.length === 0 ? (
        <p>There are absent any data.</p>
      ) : (
        <List>
          {todolistTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist} />)}
        </List>
      )}
    </>
  )
}
