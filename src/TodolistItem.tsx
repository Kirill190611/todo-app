import './App.css'
import {FilterValues, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

export type TodolistItemProps = {
    tasks: Task[]
    deleteTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string,filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    todolist: Todolist
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, id: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: TodolistItemProps) => {
    const {
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        todolist,
        deleteTodolist,
        changeTaskTitle,
        changeTodolistTitle
    } = props
    const {filter,title, todolistId} = todolist

    const createTaskHandler = (title: string) => {
        createTask(todolistId, title)
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(todolistId, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolistId, title)
    }

    return (
        <div>
            <div className='container'>
                <h3>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
                </h3>
                <Button title='X' onClick={deleteTodolistHandler}/>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler} />
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

                                const changeTaskTitleHandler = (title: string) => {
                                    changeTaskTitle(todolistId, task.id, title)
                                }

                                return (
                                    <li className={task.isDone ? 'isDone' : ''} key={task.id}>
                                        <input type="checkbox"
                                               checked={task.isDone}
                                               onChange={changeTaskStatusHandler}/>
                                        <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
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