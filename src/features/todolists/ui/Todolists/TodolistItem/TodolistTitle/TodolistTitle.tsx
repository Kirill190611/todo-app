import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, deleteTodolistAC, Todolist} from "@/features/todolists/model/todolist-reducer.ts";
import styles from './TodolistTitle.module.css'
import {useAppDispatch} from "@/common/hooks";

type Props = {
    todolist: Todolist
}

export const TodolistTitle = (props: Props) => {
    const {todolist} = props
    const {todolistId: id, title} = todolist

    const dispatch = useAppDispatch()

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({id}))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan value={title}
                              onChange={changeTodolistTitle}/>
            </h3>
            <IconButton onClick={deleteTodolist}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}