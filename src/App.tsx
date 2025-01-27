import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
    ])

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    return (
        <div className="app">
            <TodolistItem title='What to learn' tasks={tasks} deleteTask={deleteTask}/>
        </div>
    )
}
