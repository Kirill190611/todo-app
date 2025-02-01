import {Todolist} from "../App.tsx";

const initialState: Todolist[] = []

export const todolistReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete-todolist': {
            return state.filter(todolist => todolist.todolistId !== action.payload.id)
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

//Action types:
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

type Actions = DeleteTodolistAction