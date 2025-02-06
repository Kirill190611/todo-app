import {RootState} from "../app/store.ts";
import {Todolist} from "@/model/todolist-reducer.ts";

export const selectTodolists = (state: RootState): Todolist[] => state.todolists