import { TaskItem } from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import { TaskStatus } from "@/common/enums/enums"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx"
import { setAppErrorAC } from "@/app/app-slice.ts"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { DomainTodolist } from "@/features/todolists/lib/types"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const { data, isLoading, error } = useGetTasksQuery({
    todolistId: id,
    params: { count: 4, page: 1 },
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (!error) return
    if ("status" in error) {
      const errMsg = "error" in error ? error.error : JSON.stringify(error.data)
      dispatch(setAppErrorAC({ error: errMsg }))
    } else {
      dispatch(setAppErrorAC({ error: error.message || "Some error occurred" }))
    }
  }, [error])

  if (isLoading) {
    return <TasksSkeleton />
  }

  const todolistTasks = data?.items ?? []
  let filteredTasks = todolistTasks
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolistId={id} todolist={todolist} />)}
        </List>
      )}
    </>
  )
}
