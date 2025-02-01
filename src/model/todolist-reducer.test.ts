import {expect, test} from "vitest";
import {v1} from "uuid";
import {Todolist} from "../App.tsx";
import {deleteTodolistAC, todolistReducer} from "./todolist-reducer.ts";

test('correct todo should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    // 1. Starting state
    const startState: Todolist[] = [
        { todolistId: todolistId1, title: 'What to learn', filter: 'all' },
        { todolistId: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // 2. Actions

    const endState = todolistReducer(startState, deleteTodolistAC(todolistId1))

    // 3.Checking that state were changed based on action
    expect(endState.length).toBe(1);
    expect(endState[0].todolistId).toBe(todolistId2)
})