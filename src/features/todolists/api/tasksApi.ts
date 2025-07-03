import { GetTasksResponse } from "@/features/todolists/api/tasksApi.types.ts"
import { baseApi } from "@/features/todolists/api/baseApi.ts"
import { BaseResponse } from "@/common/types"
import { string } from "zod"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
    }),
    createTask: builder.mutation<BaseResponse<item: DomainTask>, string>({
  query: (title) => ({method: 'post',
    url: `/todo-lists/${todolistId}/tasks`,
  body: {title}})
})
  }),
})

export const { useGetTasksQuery } = tasksApi
