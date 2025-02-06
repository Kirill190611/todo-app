import Grid from "@mui/material/Grid2";
import {CreateItemForm} from "@/common/components/CreateItemForm.tsx";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/common/components/TodolistItem.tsx";
import Container from "@mui/material/Container";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "@/model/task-reducer.ts";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "@/model/todolist-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";

export type FilterValues = 'all' | 'active' | 'completed'

export const Main = () => {
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
    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }
    const changeTodolistTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }
    const changeFilter = (id: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    return (
        <Container maxWidth='lg'>
            <Grid container sx={{mb: '30px'}}>
                <CreateItemForm onCreateItem={createTodolist}/>
            </Grid>
            <Grid container spacing={8}>
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
            </Grid>
        </Container>
    )
}