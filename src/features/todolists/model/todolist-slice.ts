import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { FilterValues } from '@/app/Main.tsx'
import { Todolist } from '@/features/todolists/api/todolistApi.types.ts'
import { todolistApi } from '@/features/todolists/api/todolistApi.ts'

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        action.payload?.todolists.forEach((todolist) => {
          state.push({ ...todolist, filter: 'all' })
        })
      })
      .addCase(fetchTodolistsTC.rejected, (state, action) => {
        console.log(state)
        console.log(action)
      })
  },
})

export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async (_, thunkAPI) => {
  try {
    const res = await todolistApi.getTodolist()
    return { todolists: res.data }
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(null)
  }
})

export const { deleteTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, createTodolistAC } =
  todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
