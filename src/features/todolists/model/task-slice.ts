import { createTodolistTC, deleteTodolistTC } from '@/features/todolists/model/todolist-slice.ts'
import { createAppSlice } from '@/common/utils'
import { taskApi } from '@/features/todolists/api/taskApi.ts'
import { DomainTask, UpdateTaskModel } from '@/features/todolists/api/taskApi.types.ts'
import { RootState } from '@/app/store.ts'

export type TasksState = Record<string, DomainTask[]>

export const taskSlice = createAppSlice({
  name: 'tasks',
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.payload.id]
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
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
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
          if (index !== -1) {
            state[action.payload.todolistId].splice(index, 1)
          }
        },
      }
    ),
    changeTaskStatusTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> }, thunkAPI) => {
        const { taskId, todolistId, domainModel } = payload

        const allTasks = (thunkAPI.getState() as RootState).tasks[todolistId]
        const task = allTasks.find((el) => el.id === taskId)

        if (!task) {
          return thunkAPI.rejectWithValue(null)
        }

        const model: UpdateTaskModel = {
          status: task.status,
          deadline: task.deadline,
          title: task.title,
          startDate: task.startDate,
          priority: task.priority,
          description: task.description,
          ...domainModel,
        }

        try {
          const res = await taskApi.updateTask({ todolistId, taskId, model })
          return { task: res.data.data.item }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state[action.payload.task.todoListId].findIndex((task) => task.id === action.payload.task.id)
          if (index !== -1) {
            state[action.payload.task.todoListId][index] = action.payload.task
          }
        },
      }
    ),
    changeTaskTitleAC: create.reducer<{ todolistId: string; title: string; taskId: string }>((state, action) => {
      const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    }),
  }),
})

export const { fetchTasksTC, changeTaskTitleAC, createTaskTC, deleteTaskTC, changeTaskStatusTC } = taskSlice.actions
export const tasksReducer = taskSlice.reducer
export const { selectTasks } = taskSlice.selectors
