import {TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {CreateItemForm} from "./components/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {containerSx} from "./styles/TodolistItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC, deleteTodolistAC,
} from "./model/todolist-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "./model/task-reducer.ts";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import {useAppSelector} from "./common/hooks/useAppSelector.ts";
import {selectTodolists} from "./model/todolists-selectors.ts";
import {selectTasks} from "./model/tasks-selectors.ts";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Todolist = {
    todolistId: string
    title: string
    filter: FilterValues
}

export type TasksState = Record<string, Task[]>

export type FilterValues = 'all' | 'active' | 'completed'

type ThemeMode = 'light' | 'dark'

export const App = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            }
        }
    })

    const changeThemeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

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
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <AppBar position='static' sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth='lg' sx={containerSx}>
                            <IconButton color='inherit'>
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign In</NavButton>
                                <NavButton>Sign Out</NavButton>
                                <NavButton background={theme.palette.primary.dark}>FAQ</NavButton>
                                <Switch color='default' onChange={changeThemeMode} />
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
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
            </div>
        </ThemeProvider>
    )
}
