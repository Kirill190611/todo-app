import {TasksState} from "../App.tsx";
import {CreateTodolistAction, DeleteTodolistAction} from "./todolist-reducer.ts";
import {v1} from "uuid";

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
        case 'create-task': {
            return {...state, [action.payload.todolistId]: [{ id: v1(), title: action.payload.title, isDone: false }, ...state[action.payload.todolistId]]}
        }
        case 'change-task-status': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                    ? {...task, isDone: action.payload.isDone}
                    : task)}
        }
        case 'change-task-title': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                    ? {...task, title: action.payload.title}
                    : task)}
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

export const createTaskAC = (payload: {todolistId: string, title: string}) => {
    return {
        type: 'create-task',
        payload
    } as const
}

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean}) => {
    return {
        type: 'change-task-status',
        payload
    } as const
}

export const changeTaskTitleAC = (payload: { todolistId: string; title: string; taskId: string }) => {
    return {
        type: 'change-task-title',
        payload
    } as const
}

//Action types:
export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions = CreateTodolistAction
    | DeleteTodolistAction
    | DeleteTaskAction
    | CreateTaskAction
    | ChangeTaskStatusAction
    | ChangeTaskTitleAction