import Checkbox from '@mui/material/Checkbox'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ListItem from '@mui/material/ListItem'
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskTC } from '@/features/todolists/model/task-slice.ts'
import { ChangeEvent } from 'react'
import { getListItemSx } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts'
import { useAppDispatch } from '@/common/hooks'
import { DomainTask } from '@/features/todolists/api/taskApi.types.ts'
import { TaskStatus } from '@/common/enums'

type Props = {
  task: DomainTask
  todolistId: string
}

export const TaskItem = (props: Props) => {
  const { task, todolistId } = props
  const { id, status, title } = task

  const dispatch = useAppDispatch()

  const isTaskCompleted = status === TaskStatus.Completed

  const deleteTask = () => {
    dispatch(deleteTaskTC({ todolistId, taskId: id }))
  }

  const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId: id, isDone: event.currentTarget.checked }))
  }

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: id, title }))
  }

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)} key={id}>
      <div>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} />
        <EditableSpan value={title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
