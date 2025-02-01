import {Todolist} from "../App.tsx";

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

//Action types:
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction