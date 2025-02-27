import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import { TodolistItem } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'
import { selectTodolists } from '@/features/todolists/model/todolists-selectors.ts'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { useEffect } from 'react'
import { todolistApi } from '@/features/todolists/api/todolistApi.ts'
import { setTodolistAC } from '@/features/todolists/model/todolist-slice.ts'

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    todolistApi.getTodolist().then((res) => {
      dispatch(setTodolistAC({ todolists: res.data }))
    })
  }, [])

  return (
    <>
      {todolists.map((todolist) => {
        return (
          <Grid key={todolist.todolistId}>
            <Paper sx={{ p: '20px' }}>
              <TodolistItem todolist={todolist} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
