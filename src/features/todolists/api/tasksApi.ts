import { DomainTask, GetTasksResponse, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { baseApi } from "@/features/todolists/api/baseApi.ts"
import { BaseResponse } from "@/common/types"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({ method: "post", url: `/todo-lists/${todolistId}/tasks`, body: { title } }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        method: "put",
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<BaseResponse<{}>, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        method: "delete",
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi
