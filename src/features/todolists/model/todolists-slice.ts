import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { createAppSlice } from "@/common/utils"
import { changeStatusAC } from "@/app/app-slice.ts"

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    fetchTodolistsTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await todolistsApi.getTodolists()
          dispatch(changeStatusAC({ status: "succeeded" }))
          return { todolists: res.data }
        } catch (error) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((tl) => {
            state.push({ ...tl, filter: "all" })
          })
        },
      },
    ),
    createTodolistTC: create.asyncThunk(
      async (title: string, thunkAPI) => {
        try {
          const res = await todolistsApi.createTodolist(title)
          return { todolist: res.data.data.item }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.push({ ...action.payload.todolist, filter: "all" })
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (id: string, thunkAPI) => {
        try {
          await todolistsApi.deleteTodolist(id)
          return { id }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todolist) => todolist.id === action.payload.id)
          if (index !== -1) {
            state.splice(index, 1)
          }
        },
      },
    ),
    changeTodolistTitleTC: create.asyncThunk(
      async (payload: { id: string; title: string }, thunkAPI) => {
        try {
          await todolistsApi.changeTodolistTitle(payload)
          return payload
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todolist) => todolist.id === action.payload.id)
          if (index !== -1) {
            state[index].title = action.payload.title
          }
        },
      },
    ),

    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
  }),
})

export const { selectTodolists } = todolistsSlice.selectors
export const { changeTodolistTitleTC, deleteTodolistTC, createTodolistTC, fetchTodolistsTC, changeTodolistFilterAC } =
  todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
