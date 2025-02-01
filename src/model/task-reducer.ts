import {TasksState} from "../App.tsx";
import {CreateTodolistAction} from "./todolist-reducer.ts";

const initialState: TasksState = {}

export const taskReducer = (state: TasksState = initialState, action: Actions) => {
    switch (action.type) {
        case 'create-todolist': {
            return {...state, [action.payload.id]: []}
        }
        default:
            return state
    }
}

type Actions = CreateTodolistAction