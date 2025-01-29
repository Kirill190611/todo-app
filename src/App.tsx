import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Todolist = {
    todolistId: string
    title: string
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        { todolistId: todolistId1, title: 'What to learn', filter: 'all' },
        { todolistId: todolistId2, title: 'What to buy', filter: 'all' },
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Redux', isDone: false },
            { id: v1(), title: 'RTK', isDone: false },
        ]
    })

    const deleteTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)})
    }

    const createTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === id
                ? {...task, isDone}
                : task)})
    }

    const changeFilter = (id: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.todolistId === id ? {...todolist, filter} : todolist))
    }

    return (
        <div className="app">
            {
                todolists.map(todolist => {
                    const todolistTasks = tasks[todolist.todolistId]
                    let filteredTasks = todolistTasks

                    if (todolist.filter === 'active') {
                        filteredTasks = todolistTasks.filter(task => !task.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        filteredTasks = todolistTasks.filter(task => task.isDone)
                    }

                    return (
                        <TodolistItem key={todolist.todolistId}
                                      todolist={todolist}
                                      tasks={filteredTasks}
                                      deleteTask={deleteTask}
                                      changeFilter={changeFilter}
                                      createTask={createTask}
                                      changeTaskStatus={changeTaskStatus}/>
                    )
                })
            }

        </div>
    )
}
