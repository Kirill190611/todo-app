import { EditableSpan } from '@/common/components'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import styles from './TodolistTitle.module.css'
import {
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from '@/features/todolists/api/todolistsApi.ts'
import { useAppDispatch } from '@/common/hooks'
import { DomainTodolist } from '@/features/todolists/lib/types'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const dispatch = useAppDispatch()

  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  // const changeTodolistStatus = (entityStatus: RequestStatus) => {
  //   dispatch(
  //     todolistsApi.util.updateQueryData(
  //       'getTodolists',
  //       undefined,
  //       (todolists: DomainTodolist[]) => {
  //         const todolist = todolists.find((todolist) => todolist.id === id)
  //         if (todolist) {
  //           todolist.entityStatus = entityStatus
  //         }
  //       }
  //     )
  //   )
  // }

  // const deleteTodolist = () => {
  //   changeTodolistStatus('loading')
  //   removeTodolist(id)
  //     .unwrap()
  //     .catch(() => {
  //       changeTodolistStatus('idle')
  //     })
  // }

  const deleteTodolist = async () => {
    const patchResult = dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const index = state.findIndex((todolist) => todolist.id === id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
    )
    try {
      const res = await removeTodolist(id)
      if (res.error) {
        patchResult.undo()
      }
    } catch {
      patchResult.undo()
    }
  }

  const changeTodolistTitle = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
