import '../../app/App.css'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {Todolist} from "@/model/todolist-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {createTaskAC} from "@/model/task-reducer.ts";
import {TodolistTitle} from "@/common/components/TodolistTitle.tsx";
import {Tasks} from "@/common/components/Tasks.tsx";
import {FilterButtons} from "@/common/components/FilterButtons.tsx";

export type TodolistItemProps = {
    todolist: Todolist
}

export const TodolistItem = (props: TodolistItemProps) => {
    const {todolist} = props
    const {todolistId} = todolist

    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask} />
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}