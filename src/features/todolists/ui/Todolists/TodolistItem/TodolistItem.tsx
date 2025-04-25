import { FilterButtons } from './FilterButtons/FilterButtons'
import { Tasks } from './Tasks/Tasks'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm'
import { useCreateTaskMutation } from '@/features/todolists/api/tasksApi.ts'
import { DomainTodolist } from '@/features/todolists/lib/types'
import styles from './TodolistItem.module.css'

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const [createTask] = useCreateTaskMutation()

  const addTask = (title: string) => {
    createTask({ todolistId: todolist.id, title })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container_main}>
        <TodolistTitle todolist={todolist} />
        <CreateItemForm className={styles.item_form} onCreateItem={addTask} />
      </div>
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
