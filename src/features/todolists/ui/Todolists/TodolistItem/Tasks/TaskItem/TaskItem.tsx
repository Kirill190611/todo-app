import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from "@/features/todolists/model/task-reducer.ts";
import {ChangeEvent} from "react";
import {getListItemSx} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts";
import {useAppDispatch} from "@/common/hooks";

type Props = {
    task: Task
    todolistId: string
}

export const TaskItem = (props: Props) => {
    const {task, todolistId} = props
    const {id, isDone, title} = task

    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskAC({todolistId, taskId: id}))
    }

    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({todolistId, taskId: id, isDone: event.currentTarget.checked}))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: id, title}))
    }

    return (
        <ListItem sx={getListItemSx(isDone)}
                  key={id}>
            <div>
                <Checkbox checked={isDone}
                          onChange={changeTaskStatus}/>
                <EditableSpan value={title}
                              onChange={changeTaskTitle}/>
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}