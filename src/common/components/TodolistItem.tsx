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
import {Task} from "@/model/task-reducer.ts";
import {FilterValues} from "@/common/components/Header/Main/Main.tsx";
import {Todolist} from "@/model/todolist-reducer.ts";

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
                    <EditableSpan value={title}
                                  onChange={changeTodolistTitleHandler} />
                </h3>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler} />
            {
                tasks.length === 0 ? (
                    <p>There is no any data</p>
                ) : (
                    <List>
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
                                    <ListItem sx={getListItemSx(task.isDone)}
                                              key={task.id}>
                                        <div>
                                            <Checkbox checked={task.isDone}
                                                      onChange={changeTaskStatusHandler}/>
                                            <EditableSpan value={task.title}
                                                          onChange={changeTaskTitleHandler}/>
                                        </div>
                                        <IconButton onClick={deleteTaskHandler}>
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
                        onClick={() => changeFilterHandler('all')}>All</Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color='primary'
                        onClick={() => changeFilterHandler('active')}>Active</Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color='secondary'
                        onClick={() => changeFilterHandler('completed')}>Completed</Button>
            </Box>
        </div>
    )
}