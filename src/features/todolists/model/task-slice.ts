import { createTodolistTC, deleteTodolistTC } from '@/features/todolists/model/todolist-slice.ts'
import { createAppSlice } from '@/common/utils'
import { taskApi } from '@/features/todolists/api/taskApi.ts'
import { DomainTask } from '@/features/todolists/api/taskApi.types.ts'
import { TaskPriority, TaskStatus } from '@/common/enums'
import { nanoid } from '@reduxjs/toolkit'

export type TasksState = Record<string, DomainTask[]>

export const taskSlice = createAppSlice({
  name: 'tasks',
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          const res = await taskApi.getTasks(todolistId)
          return { todolistId, tasks: res.data.items }
        } catch (error) {
          console.log(error)
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      }
    ),
    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1)
      }
    }),
    createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const newTask: DomainTask = {
        title: action.payload.title,
        todoListId: action.payload.todolistId,
        startDate: '',
        priority: TaskPriority.Low,
        description: '',
        deadline: '',
        status: TaskStatus.New,
        addedDate: '',
        order: 0,
        id: nanoid(),
      }

      state[action.payload.todolistId].unshift(newTask)
    }),
    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.status = action.payload.isDone ? TaskStatus.Completed : TaskStatus.New
      }
    }),
    changeTaskTitleAC: create.reducer<{ todolistId: string; title: string; taskId: string }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.payload.id]
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
  },
})

export const { fetchTasksTC, deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC, createTaskAC } = taskSlice.actions
export const tasksReducer = taskSlice.reducer
export const { selectTasks } = taskSlice.selectors
