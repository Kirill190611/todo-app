import '../../app/App.css'
import {CreateItemForm} from "./CreateItemForm.tsx";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import {containerSx} from "@/styles/TodolistItem.styles.ts";
import {FilterValues} from "@/common/components/Header/Main/Main.tsx";
import {changeTodolistFilterAC, Todolist} from "@/model/todolist-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {createTaskAC} from "@/model/task-reducer.ts";
import {TodolistTitle} from "@/common/components/TodolistTitle.tsx";
import {Tasks} from "@/common/components/Tasks.tsx";

export type TodolistItemProps = {
    todolist: Todolist
}

export const TodolistItem = (props: TodolistItemProps) => {
    const {todolist} = props
    const {filter, todolistId} = todolist

    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }

    const changeFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask} />
            <Tasks todolist={todolist}/>
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