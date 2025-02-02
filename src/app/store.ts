import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {taskReducer} from "../model/task-reducer.ts";
import {todolistReducer} from "../model/todolist-reducer.ts";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ReturnType<typeof store.dispatch>


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.store = store