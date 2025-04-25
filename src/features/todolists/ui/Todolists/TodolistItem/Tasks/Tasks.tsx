import { TaskStatus } from '@/common/enums'
import { TaskItem } from './TaskItem/TaskItem'
import List from '@mui/material/List'
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi.ts'
import { TasksSkeleton } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx'
import { DomainTodolist } from '@/features/todolists/lib/types'
import { TaskPagination } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskPagination/TaskPagination.tsx'
import { useState } from 'react'
import { PAGE_SIZE } from '@/common/constants/constants.ts'
import styles from './Tasks.module.css'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const [page, setPage] = useState(1)

  const { data: tasks, isLoading } = useGetTasksQuery({
    todolistId: id,
    params: { page },
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
        <>
          <List className={styles.wrapper}>
            {todolistTasks?.map((task) => (
              <TaskItem key={task.id} task={task} todolist={todolist} />
            ))}
          </List>
          {tasks && tasks.totalCount > PAGE_SIZE && (
            <TaskPagination
              totalCount={tasks?.totalCount || 0}
              page={page}
              setPage={setPage}
            />
          )}
        </>
      )}
    </>
  )
}
