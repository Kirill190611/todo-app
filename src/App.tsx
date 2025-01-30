import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
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

export const App = () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        { todolistId: todolistId1, title: 'What to learn', filter: 'all' },
        { todolistId: todolistId2, title: 'What to buy', filter: 'all' },
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Redux', isDone: false },
            { id: v1(), title: 'RTK', isDone: false },
        ]
    })

    const deleteTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)})
    }

    const createTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === id
                ? {...task, isDone}
                : task)})
    }

    const changeTaskTitle = (todolistId: string, id: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === id
                ? {...task, title}
                : task)}
        )
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.todolistId !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const createTodolist = (title: string) => {
        const todolistId = v1()
        setTodolists([{todolistId: todolistId, title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todolist => todolist.todolistId === todolistId ? {...todolist, title} : todolist))
    }
    const changeFilter = (id: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.todolistId === id ? {...todolist, filter} : todolist))
    }

    return (
        <div className="app">
            <AppBar position='static' sx={{mb: '30px'}}>
                <Toolbar>
                    <Container maxWidth='lg' sx={containerSx}>
                        <IconButton color='inherit'>
                            <MenuIcon />
                        </IconButton>
                        <div>
                            <NavButton>Sign In</NavButton>
                            <NavButton>Sign Out</NavButton>
                            <NavButton background={'dodgerblue'}>FAQ</NavButton>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth='lg'>
                <Grid container sx={{mb: '30px'}}>
                    <CreateItemForm onCreateItem={createTodolist} />
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
    )
}
