import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { BaseResponse } from "@/common/types"

export const todolistsApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", import.meta.env.VITE_API_KEY)
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
  }),
  endpoints: (build) => ({
    getTodolists: build.query<any[], void>({
      query: () => "todo-lists",
      transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
        todolists.map((todolist) => ({ ...todolist, filter: "all", entityStatus: "idle" })),
    }),
    addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: "todo-lists",
        method: "POST",
        body: { title },
      }),
    }),
  }),
})

export const { useGetTodolistsQuery, useAddTodolistMutation } = todolistsApi
