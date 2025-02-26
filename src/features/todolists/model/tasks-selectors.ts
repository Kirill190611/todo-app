import { RootState } from '@/app/store.ts'
import { TasksState } from '@/features/todolists/model/task-slice.ts'

export const selectTasks = (state: RootState): TasksState => state.tasks
