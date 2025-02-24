import { type ChangeEvent, type CSSProperties, useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { CreateItemForm, EditableSpan } from '@/common/components'
import { Todolist } from '@/features/todolists/api/todolistApi.types.ts'
import { todolistApi } from '@/features/todolists/api/todolistApi.ts'
import { taskApi } from '@/features/todolists/api/taskApi.ts'
import { DomainTask, UpdateTaskModel } from '@/features/todolists/api/taskApi.types.ts'

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  useEffect(() => {
    todolistApi.getTodolist().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((todolist) => {
        taskApi.getTasks(todolist.id).then((res) => {
          setTasks({ ...tasks, [todolist.id]: res.data.items })
        })
      })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistApi.createTodolist({ title }).then((res) => {
      const todolist = res.data.data.item
      setTodolists([todolist, ...todolists])
      setTasks({ ...tasks, [todolist.id]: [] })
    })
  }

  const deleteTodolist = (id: string) => {
    todolistApi.deleteTodolist({ id }).then(() => setTodolists(todolists.filter((todolist) => todolist.id !== id)))
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistApi
      .changeTodolistTitle({ id, title })
      .then(() => setTodolists(todolists.map((todolist) => (todolist.id === id ? { ...todolist, title } : todolist))))
  }

  const createTask = (todolistId: string, title: string) => {
    taskApi.createTask({ todolistId, title }).then((res) => {
      const oldTasks = tasks[todolistId] || []
      setTasks({ ...tasks, [todolistId]: [res.data.data.item, ...oldTasks] })
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {}

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      priority: task.priority,
      startDate: task.startDate,
      status: e.currentTarget.checked ? 2 : 0,
      deadline: task.deadline,
    }

    taskApi.changeTaskStatus({ todolistId: task.todoListId, taskId: task.id, model }).then(() =>
      setTasks({
        ...tasks,
        [task.todoListId]: tasks[task.todoListId].map((el) => (el.id === task.id ? { ...el, ...model } : el)),
      })
    )
  }

  const changeTaskTitle = (task: any, title: string) => {}

  return (
    <div style={{ margin: '20px' }}>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map((todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan value={todolist.title} onChange={(title) => changeTodolistTitle(todolist.id, title)} />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm onCreateItem={(title) => createTask(todolist.id, title)} />
          {!!tasks[todolist.id] &&
            tasks[todolist.id].map((task) => (
              <div key={task.id}>
                <Checkbox checked={task.status === 2} onChange={(e) => changeTaskStatus(e, task)} />
                <EditableSpan value={task.title} onChange={(title) => changeTaskTitle(task, title)} />
                <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}
