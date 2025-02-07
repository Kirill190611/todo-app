import '../../app/App.css'
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {containerSx, getListItemSx} from "@/styles/TodolistItem.styles.ts";
import {FilterValues} from "@/common/components/Header/Main/Main.tsx";
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC, Todolist} from "@/model/todolist-reducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "@/model/task-reducer.ts";

export type TodolistItemProps = {
    todolist: Todolist
}

export const TodolistItem = (props: TodolistItemProps) => {
    const {
        todolist,
    } = props
    const {filter,title, todolistId} = todolist

    const dispatch = useAppDispatch()

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[todolist.todolistId]
    let filteredTasks = todolistTasks

    if (todolist.filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (todolist.filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }

    const changeFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))
    }

    return (
        <div>
            <div className='container'>
                <h3>
                    <EditableSpan value={title}
                                  onChange={changeTodolistTitle} />
                </h3>
                <IconButton onClick={deleteTodolist}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={createTask} />
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
            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color='inherit'
                        onClick={() => changeFilter('all')}>All</Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color='primary'
                        onClick={() => changeFilter('active')}>Active</Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color='secondary'
                        onClick={() => changeFilter('completed')}>Completed</Button>
            </Box>
        </div>
    )
}