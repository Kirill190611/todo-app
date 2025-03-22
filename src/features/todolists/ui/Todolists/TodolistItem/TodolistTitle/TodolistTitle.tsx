import { EditableSpan } from '@/common/components'
import { useAppDispatch } from '@/common/hooks'
import {
  changeTodolistTitleTC,
  type DomainTodolist,
} from '@/features/todolists/model/todolists-slice'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import styles from './TodolistTitle.module.css'
import { useRemoveTodolistMutation } from '@/features/todolists/api/_todolistsApi.ts'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()

  const dispatch = useAppDispatch()

  const deleteTodolist = () => {
    removeTodolist(id)
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleTC({ id, title }))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolist} disabled={entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
