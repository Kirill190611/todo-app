import {beforeEach, expect, test} from "vitest";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC, Todolist,
    todolistReducer
} from "../todolist-reducer.ts";
import {nanoid} from "@reduxjs/toolkit";

let todolistId1: string
let todolistId2: string
let startState: Todolist[] = []

beforeEach(() => {
    todolistId1 = nanoid()
    todolistId2 = nanoid()

    startState = [
        { todolistId: todolistId1, title: 'What to learn', filter: 'all' },
        { todolistId: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todo should be deleted', () => {
    // 2. Actions
    const endState = todolistReducer(startState, deleteTodolistAC({id: todolistId1}))

    // 3.Checking that state were changed based on action
    expect(endState.length).toBe(1);
    expect(endState[0].todolistId).toBe(todolistId2)
})

test('correct todo should be created', () => {
    // 2. Actions
    const title = 'New todo'
    const endState = todolistReducer(startState, createTodolistAC(title))

    // 3.Checking that state were changed based on action
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

test('correct todolist should change own title', () => {
    // 2. Actions
    const title = 'New title'
    const endState = todolistReducer(startState, changeTodolistTitleAC({ id: todolistId2, title }))

    // 3.Checking that state were changed based on action
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})

test('correct todolist should change own filter', () => {
    // 2. Actions
    const filter = 'completed'
    const endState = todolistReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter }))

    // 3.Checking that state were changed based on action
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(filter)
})