import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import {Todolist} from "@/features/todolists/model/todolist-reducer.ts";
import {createTaskAC} from "@/features/todolists/model/task-reducer.ts";
import {TodolistTitle} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx";
import {useAppDispatch} from "@/common/hooks";

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