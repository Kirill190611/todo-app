import './App.css'
import {FilterValues, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type TodolistItemProps = {
    tasks: Task[]
    deleteTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string,filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    todolist: Todolist
}

export const TodolistItem = (props: TodolistItemProps) => {
    const {tasks, deleteTask, changeFilter, createTask, changeTaskStatus, todolist} = props
    const {filter,title, todolistId} = todolist

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            createTask(todolistId, taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(todolistId, filter)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error' : ''}
                       value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title='+' onClick={createTaskHandler}/>
                {error && <div className='error-message'>{error}</div>}
            </div>
            {
                tasks.length === 0 ? (
                    <p>There is no any data</p>
                ) : (
                    <ul>
                        {
                            tasks.map(task => {
                                const deleteTaskHandler = () => {
                                    deleteTask(todolistId ,task.id)
                                }

                                const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                    changeTaskStatus(todolistId ,task.id, event.currentTarget.checked)
                                }

                                return (
                                    <li className={task.isDone ? 'isDone' : ''} key={task.id}>
                                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
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
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title='All'
                        onClick={() => changeFilterHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title='Active'
                        onClick={() => changeFilterHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title='Completed'
                        onClick={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    )
}