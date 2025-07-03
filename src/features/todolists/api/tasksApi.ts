import { DomainTask, GetTasksResponse } from "@/features/todolists/api/tasksApi.types.ts"
import { baseApi } from "@/features/todolists/api/baseApi.ts"
import { BaseResponse } from "@/common/types"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
    }),
    createTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({ method: "post", url: `/todo-lists/${todolistId}/tasks`, body: { title } }),
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation } = tasksApi
