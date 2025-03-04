import { createAsyncThunk } from '@reduxjs/toolkit'
import { FilterValues } from '@/app/Main.tsx'
import { Todolist } from '@/features/todolists/api/todolistApi.types.ts'
import { todolistApi } from '@/features/todolists/api/todolistApi.ts'
import { createAppSlice } from '@/common/utils'
import { setAppStatusAC } from '@/app/app-slice.ts'

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export const todolistsSlice = createAppSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    fetchTodolistsTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await todolistApi.getTodolist()
          dispatch(setAppStatusAC({ status: 'succeeded' }))
          return { todolists: res.data }
        } catch (error) {
          dispatch(setAppStatusAC({ status: 'failed' }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((todolist) => {
            state.push({ ...todolist, filter: 'all' })
          })
        },
      }
    ),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: 'all' })
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
  },
})

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (payload: { id: string; title: string }, thunkApi) => {
    try {
      await todolistApi.changeTodolistTitle(payload)
      return payload
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue(null)
    }
  }
)

export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTC`,
  async (payload: { title: string }, thunkAPI) => {
    try {
      const res = await todolistApi.createTodolist(payload)
      return { todolist: res.data.data.item }
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(null)
    }
  }
)

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (payload: { id: string }, thunkAPI) => {
    try {
      await todolistApi.deleteTodolist(payload)
      return { payload }
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(null)
    }
  }
)

export const { changeTodolistFilterAC, fetchTodolistsTC } = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors
