import {FilterValues, Task} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type TodolistItemProps = {
    title: string
    tasks: Task[]
    deleteTask: (id: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
}

export const TodolistItem = (props: TodolistItemProps) => {
    const {title, tasks, deleteTask, changeFilter, createTask} = props
    const [taskTitle, setTaskTitle] = useState('')

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title='+' onClick={createTaskHandler}/>
            </div>
            {
                tasks.length === 0 ? (
                    <p>There is no any data</p>
                ) : (
                    <ul>
                        {
                            tasks.map(task => {
                                const deleteTaskHandler = () => {
                                    deleteTask(task.id)
                                }

                                return (
                                    <li key={task.id}>
                                        <input type="checkbox" checked={task.isDone}/>
                                        <span>{task.title}</span>
                                        <Button title='X' onClick={deleteTaskHandler}/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }
            <div>
                <Button title='All' onClick={() => changeFilter('all')}/>
                <Button title='Active' onClick={() => changeFilter('active')}/>
                <Button title='Completed' onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}