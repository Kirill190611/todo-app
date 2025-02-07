import List from "@mui/material/List";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/model/task-reducer.ts";
import {ChangeEvent} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "@/styles/TodolistItem.styles.ts";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/common/components/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolist} from "@/model/todolist-reducer.ts";

type Props = {
    todolist: Todolist
}

export const Tasks = (props: Props) => {
    const {todolist} = props
    const {todolistId} = todolist

    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const todolistTasks = tasks[todolistId]
    let filteredTasks = todolistTasks

    if (todolist.filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (todolist.filter === 'completed') {
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
                            filteredTasks.map(task => {
                                const deleteTask = () => {
                                    dispatch(deleteTaskAC({todolistId, taskId: task.id}))
                                }

                                const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
                                    dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone: event.currentTarget.checked}))
                                }

                                const changeTaskTitle = (title: string) => {
                                    dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))
                                }

                                return (
                                    <ListItem sx={getListItemSx(task.isDone)}
                                              key={task.id}>
                                        <div>
                                            <Checkbox checked={task.isDone}
                                                      onChange={changeTaskStatus}/>
                                            <EditableSpan value={task.title}
                                                          onChange={changeTaskTitle}/>
                                        </div>
                                        <IconButton onClick={deleteTask}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                )
            }
        </>
    )
}