import {containerSx} from "@/styles/TodolistItem.styles.ts";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {FilterValues} from "@/common/components/Header/Main/Main.tsx";
import {changeTodolistFilterAC, Todolist} from "@/model/todolist-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {
    todolist: Todolist
}

export const FilterButtons = (props: Props) => {
    const {todolist} = props
    const {todolistId, filter} = todolist

    const dispatch = useAppDispatch()

    const changeFilter = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }

    return (
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
    )
}