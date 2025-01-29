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
    const [todolists, setTodolists] = useState<Todolist[]>([
        { todolistId: v1(), title: 'What to learn', filter: 'all' },
        { todolistId: v1(), title: 'What to buy', filter: 'all' },
    ])

    const [tasks, setTasks] = useState<Task[]>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
    ])

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const createTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const changeFilter = (id: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.todolistId === id ? {...todolist, filter} : todolist))
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === id ? {...task, isDone} : task))
    }

    return (
        <div className="app">
            {
                todolists.map(todolist => {
                    let filteredTasks = tasks
                    if (todolist.filter === 'active') {
                        filteredTasks = tasks.filter(task => !task.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        filteredTasks = tasks.filter(task => task.isDone)
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
