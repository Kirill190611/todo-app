import {beforeEach, expect, test} from "vitest";
import {v1} from "uuid";
import {Todolist} from "../App.tsx";
import {changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistReducer} from "./todolist-reducer.ts";

let todolistId1: string
let todolistId2: string
let startState: Todolist[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { todolistId: todolistId1, title: 'What to learn', filter: 'all' },
        { todolistId: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todo should be deleted', () => {
    // 2. Actions

    const endState = todolistReducer(startState, deleteTodolistAC(todolistId1))

    // 3.Checking that state were changed based on action
    expect(endState.length).toBe(1);
    expect(endState[0].todolistId).toBe(todolistId2)
})

test('correct todo should be created', () => {
    // 2. Actions
    const title = 'New todo'
    const id = v1()
    const endState = todolistReducer(startState, createTodolistAC({ title, id }))

    // 3.Checking that state were changed based on action
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(title)
})

test('correct todolist should change own title', () => {
    // 2. Actions
    const title = 'New title'
    const endState = todolistReducer(startState, changeTodolistTitleAC({ id: todolistId2, title: title }))

    // 3.Checking that state were changed based on action
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})