import { createSlice, nanoid } from '@reduxjs/toolkit'
import { FilterValues } from '@/app/Main.tsx'
import { Todolist } from '@/features/todolists/api/todolistApi.types.ts'

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    setTodolistAC: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      action.payload.todolists.forEach((todolist) => state.push({ ...todolist, filter: 'all' }))
    }),
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    createTodolistAC: create.preparedReducer(
      (title: string) => ({ payload: { title, id: nanoid() } }),
      (state, action) => {
        state.push({ ...action.payload, filter: 'all', addedDate: '', order: 0 })
      }
    ),
  }),
})

export const { deleteTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, createTodolistAC, setTodolistAC } =
  todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
