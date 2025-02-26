import { configureStore } from '@reduxjs/toolkit'
import { taskSlice, tasksReducer } from '@/features/todolists/model/task-slice.ts'
import { todolistsReducer, todolistsSlice } from '@/features/todolists/model/todolist-slice.ts'
import { appReducer, appSlice } from '@/app/app-slice.ts'

export const store = configureStore({
  reducer: {
    [taskSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.store = store
