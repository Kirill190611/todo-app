import List from "@mui/material/List";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/features/todolists/model/tasks-selectors.ts";
import {Todolist} from "@/features/todolists/model/todolist-reducer.ts";
import {TaskItem} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx";

type Props = {
    todolist: Todolist
}

export const Tasks = (props: Props) => {
    const {todolist} = props
    const {todolistId, filter} = todolist

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[todolistId]
    let filteredTasks = todolistTasks

    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {
                filteredTasks.length === 0 ? (
                    <p>There is no any data</p>
                ) : (
                    <List>
                        {
                            filteredTasks.map(task => (
                                    <TaskItem key={task.id} task={task} todolistId={todolistId}/>
                                )
                            )
                        }
                    </List>
                )
            }
        </>
    )
}