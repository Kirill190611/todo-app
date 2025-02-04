import {TasksState} from "../App.tsx";
import {beforeEach, expect, test} from "vitest";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, taskReducer} from "./task-reducer.ts";
import {createTodolistAC, deleteTodolistAC} from "./todolist-reducer.ts";
import {v1} from "uuid";

let startState: TasksState = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ]
    }
})

test('array should be created for new todo', () => {
    const title = 'New todolist'
    const id = v1()
    const endState = taskReducer(startState, createTodolistAC({title, id}))

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key !== 'todolistId1' && key !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = taskReducer(startState, deleteTodolistAC({id:'todolistId2'}))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})

test('correct task should be deleted', () => {
    const endState = taskReducer(startState, deleteTaskAC({todolistId: 'todolistId2', taskId: '2'}))

    expect(endState).toEqual({
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '3', title: 'tea', isDone: false },
        ],
    })
})

test('correct task should be created at correct array', () => {
    const title = 'juice'
    const endState = taskReducer(startState, createTaskAC({todolistId: 'todolistId2', title}))

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(4)
    expect(endState.todolistId2[0].id).toBeDefined()
    expect(endState.todolistId2[0].title).toBe(title)
    expect(endState.todolistId2[0].isDone).toBe(false)
})

test('correct task should be change own status', () => {
    const endState = taskReducer(startState, changeTaskStatusAC({ todolistId: 'todolistId2', taskId: '2', isDone: false }))

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2[1].isDone).toBe(false)
})

test('correct task should be change own title', () => {
    const title = '123 123'
    const endState = taskReducer(startState, changeTaskTitleAC({ todolistId: 'todolistId2', taskId: '2', title: title }))

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2[1].title).toBe(title)
})