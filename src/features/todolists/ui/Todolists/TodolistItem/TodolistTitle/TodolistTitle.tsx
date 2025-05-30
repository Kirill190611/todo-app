import { EditableSpan } from '@/common/components'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import styles from './TodolistTitle.module.css'
import {
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from '@/features/todolists/api/todolistsApi.ts'
import { DomainTodolist } from '@/features/todolists/lib/types'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const deleteTodolist = () => {
    removeTodolist(id)
  }

  const changeTodolistTitle = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
