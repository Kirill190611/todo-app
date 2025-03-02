import { createTodolistTC, deleteTodolistTC } from '@/features/todolists/model/todolist-slice.ts'
import { createAppSlice } from '@/common/utils'
import { taskApi } from '@/features/todolists/api/taskApi.ts'
import { DomainTask } from '@/features/todolists/api/taskApi.types.ts'
import { TaskStatus } from '@/common/enums'

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
    createTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, thunkAPI) => {
        try {
          const res = await taskApi.createTask(payload)
          return { task: res.data.data.item }
        } catch (error) {
          console.log(error)
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task)
        },
      }
    ),
    deleteTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
        try {
          await taskApi.deleteTask(payload)
          return payload
        } catch (error) {
          console.log(error)
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
          if (index !== -1) {
            state[action.payload.todolistId].splice(index, 1)
          }
          console.log(`task ${index} were deleted`)
        },
      }
    ),
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

export const { fetchTasksTC, changeTaskStatusAC, changeTaskTitleAC, createTaskTC, deleteTaskTC } = taskSlice.actions
export const tasksReducer = taskSlice.reducer
export const { selectTasks } = taskSlice.selectors
