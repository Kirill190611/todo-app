import {RootState} from "../app/store.ts";
import {TasksState} from "@/model/task-reducer.ts";

export const selectTasks = (state: RootState): TasksState => state.tasks