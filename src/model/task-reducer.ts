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
        case 'delete-task': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
        }
        default:
            return state
    }
}

//Action creators:
export const deleteTaskAC = (payload: {todolistId: string, taskId: string}) => {
    return {
        type: 'delete-task',
        payload
    } as const
}

//Action types:
export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction