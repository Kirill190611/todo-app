import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { tasksReducer } from '../features/todolists/model/task-slice.ts'
import { appReducer } from '@/app/app-slice.ts'
import { todolistsReducer } from '@/features/todolists/model/todolist-slice.ts'

const rootReducer = combineReducers({
  app: appReducer,
  tasks: tasksReducer,
  todolists: todolistsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.store = store
