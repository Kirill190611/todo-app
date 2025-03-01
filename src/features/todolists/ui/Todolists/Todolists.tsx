import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import { TodolistItem } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { useEffect } from 'react'
import { fetchTodolistsTC, selectTodolists } from '@/features/todolists/model/todolist-slice.ts'

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((todolist) => {
        return (
          <Grid key={todolist.id}>
            <Paper sx={{ p: '20px' }}>
              <TodolistItem todolist={todolist} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
