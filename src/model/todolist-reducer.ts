import {FilterValues, Todolist} from "../App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: Todolist[] = []

export const todolistReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.todolistId === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({...action.payload ,todolistId: action.payload.id, filter: 'all'})
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.todolistId === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const todolist = state.find(todolist => todolist.todolistId === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        })
})

//Action creators:
export const deleteTodolistAC = createAction<{id: string}>('todolists/delete-todolist')

export const createTodolistAC = createAction('todolists/create-todolist', (title: string) => {
    return {
        payload: {
            title,
            id: nanoid()
        }
    }
})

export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolists/change-todolist-title')

export const changeTodolistFilterAC = createAction<{id: string, filter: FilterValues}>('todolists/change-todolist-filter')