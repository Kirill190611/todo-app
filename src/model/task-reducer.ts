import {TasksState} from "../App.tsx";
import {createTodolistAC, deleteTodolistAC} from "./todolist-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TasksState = {}

export const taskReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todolistId].unshift({id: action.payload.taskId, title: action.payload.title, isDone: false})
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        })
})

//Action creators:

export const deleteTaskAC = createAction<{todolistId: string, taskId: string}>('tasks/delete-task')

export const createTaskAC = createAction('tasks/create-task', (todolistId: string, title: string) => {
    return {
        payload: {
            todolistId,
            taskId: nanoid(),
            title
        }
    }
})

export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string, isDone: boolean}>('tasks/change-task-status')

export const changeTaskTitleAC = createAction<{todolistId: string; title: string; taskId: string}>('tasks/change-task-title')