import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import { TaskStatus } from '@/common/enums'
import type { DomainTask } from '@/features/todolists/api/tasksApi.types'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import type { ChangeEvent } from 'react'
import { getListItemSx } from './TaskItem.styles'
import {
  useRemoveTaskMutation,
  useUpdateTaskMutation,
} from '@/features/todolists/api/tasksApi.ts'
import { CreateTaskModel } from '@/features/todolists/lib/utils/CreateTaskModel.ts'
import { DomainTodolist } from '@/features/todolists/lib/types'
import styles from './TaskItem.module.css'

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const TaskItem = ({ task, todolist }: Props) => {
  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const deleteTask = () => {
    removeTask({ todolistId: todolist.id, taskId: task.id })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
      ? TaskStatus.Completed
      : TaskStatus.New
    const model = CreateTaskModel(task, { status })
    updateTask({ todolistId: todolist.id, taskId: task.id, model })
  }

  const changeTaskTitle = (title: string) => {
    const model = CreateTaskModel(task, { title })
    updateTask({ todolistId: todolist.id, taskId: task.id, model })
  }

  const isTaskCompleted = task.status === TaskStatus.Completed

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div className={styles.wrapper}>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
