import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/common/components/TodolistItem.tsx";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "@/model/task-reducer.ts";
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC} from "@/model/todolist-reducer.ts";
import {FilterValues} from "@/common/components/Header/Main/Main.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const deleteTask = (todolistId: string, id: string) => {
        dispatch(deleteTaskAC({todolistId, taskId: id}))
    }
    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId: id, isDone}))
    }
    const changeTaskTitle = (todolistId: string, id: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, title, taskId: id}))
    }
    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }
    const changeTodolistTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }
    const changeFilter = (id: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    return (
        <>
            {
                todolists.map(todolist => {
                    const todolistTasks = tasks[todolist.todolistId]
                    let filteredTasks = todolistTasks

                    if (todolist.filter === 'active') {
                        filteredTasks = todolistTasks.filter(task => !task.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        filteredTasks = todolistTasks.filter(task => task.isDone)
                    }

                    return (
                        <Grid key={todolist.todolistId}>
                            <Paper sx={{p: '20px'}}>
                                <TodolistItem key={todolist.todolistId}
                                              todolist={todolist}
                                              tasks={filteredTasks}
                                              deleteTask={deleteTask}
                                              changeFilter={changeFilter}
                                              createTask={createTask}
                                              changeTaskStatus={changeTaskStatus}
                                              deleteTodolist={deleteTodolist}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolistTitle={changeTodolistTitle}/>
                            </Paper>
                        </Grid>
                    )
                })
            }
        </>
    )
}