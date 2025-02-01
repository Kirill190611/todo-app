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

export const createTodolistAC = (title: string, id: string) => {
    return {
        type: 'create-todolist',
        payload: {
            title,
            id
        }
    } as const
}

//Action types:
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

type Actions = DeleteTodolistAction | CreateTodolistAction