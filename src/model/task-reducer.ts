import {TasksState} from "../App.tsx";
import {CreateTodolistAction, DeleteTodolistAction} from "./todolist-reducer.ts";

const initialState: TasksState = {}

export const taskReducer = (state: TasksState = initialState, action: Actions) => {
    switch (action.type) {
        case 'create-todolist': {
            return {...state, [action.payload.id]: []}
        }
        case 'delete-todolist': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        default:
            return state
    }
}

type Actions = CreateTodolistAction | DeleteTodolistAction