import {FilterValues, Todolist} from "../App.tsx";

const initialState: Todolist[] = []

export const todolistReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete-todolist': {
            return state.filter(todolist => todolist.todolistId !== action.payload.id)
        }
        case 'create-todolist': {
            return [ { todolistId: action.payload.id, title: action.payload.title, filter: 'all' }, ...state ]
        }
        case 'change-todolist-title': {
            return state.map(todolist => todolist.todolistId === action.payload.id
                ? {...todolist, title: action.payload.title}
                : todolist)
        }
        case 'change-todolist-filter': {
            return state.map(todolist => todolist.todolistId === action.payload.id
                ? {...todolist, filter: action.payload.filter}
                : todolist)
        }
        default:
            return state
    }
}

//Action creators:
export const deleteTodolistAC = (id: string) => {
    return {
        type: 'delete-todolist',
        payload: {
            id
        }
    } as const
}

export const createTodolistAC = (payload: { title: string, id: string }) => {
    return {
        type: 'create-todolist',
        payload
    } as const
}

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return {
        type: 'change-todolist-title',
        payload
    } as const
}

export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValues }) => {
    return {
        type: 'change-todolist-filter',
        payload
    } as const
}

//Action types:
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction