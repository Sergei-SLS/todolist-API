import { TaskItem } from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { TaskStatus } from "@/common/enums/enums"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const { data, isLoading } = useGetTasksQuery(id)

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
