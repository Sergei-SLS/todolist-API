import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { useAppDispatch } from "@/common/hooks"
import {
  changeTodolistTitleTC,
  deleteTodolistTC,
  type DomainTodolist,
} from "@/features/todolists/model/todolists-slice.ts"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import { useRemoveTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()

  const dispatch = useAppDispatch()

  const deleteTodolist = () => {
    removeTodolist(id)
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleTC({ id, title }))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} isDisabled={todolist.entityStatus === "loading"} />
      </h3>
      <IconButton onClick={deleteTodolist} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
