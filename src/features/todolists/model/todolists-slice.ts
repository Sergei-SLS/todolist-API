import { createSlice, nanoid } from "@reduxjs/toolkit"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    setTodolistsAC: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      return action.payload.todolists.map((tl) => {
        return { ...tl, filter: "all", entityStatus: "idle" }
      })
    }),
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    createTodolistAC: create.preparedReducer(
      (title: string) => ({ payload: { title, id: nanoid() } }),
      (state, action) => {
        state.push({ ...action.payload, filter: "all", addedDate: "", order: 0 })
      },
    ),
  }),
})

export const { setTodolistsAC, deleteTodolistAC, createTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC } =
  todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

// export type Todolist = {
//   id: string
//   title: string
//   filter: FilterValues
// }

export type FilterValues = "all" | "active" | "completed"
