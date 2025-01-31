import {Todolist} from "../App.tsx";

const initialState: Todolist[] = []

export const todolistReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete-todolist': {
            return state
        }
        default:
            return state
    }
}

type Actions = {
    type: string
    payload: any
}