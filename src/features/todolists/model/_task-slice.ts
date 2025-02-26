import { createTodolistAC, deleteTodolistAC } from './todolist-slice.ts'
import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = Record<string, Task[]>

const initialState: TasksState = {}

export const changeTaskTitleAC = createAction<{ todolistId: string; title: string; taskId: string }>(
  'tasks/change-task-title'
)

export const taskSlice = createReducer(initialState, (builder) => {
  builder
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = []
    })
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    })
})
