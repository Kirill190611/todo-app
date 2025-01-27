import {Task} from "./App.tsx";
import {Button} from "./Button.tsx";

export type TodolistItemProps = {
    title: string
    tasks: Task[]
    deleteTask: (id: number) => void
}

export const TodolistItem = (props: TodolistItemProps) => {
    const {title, tasks, deleteTask} = props

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title='+'/>
            </div>
            {
                tasks.length === 0 ? (
                    <p>There is no any data</p>
                ) : (
                    <ul>
                        {
                            tasks.map(task => {
                                return (
                                    <li key={task.id}>
                                        <input type="checkbox" checked={task.isDone}/>
                                        <span>{task.title}</span>
                                        <Button title='X' onClick={() => deleteTask(task.id)}/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }
            <div>
                <Button title='All'/>
                <Button title='Active'/>
                <Button title='Completed'/>
            </div>
        </div>
    )
}