import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { RequestStatus } from "@/common/types"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatus,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        if (
          todolistsApi.endpoints.getTodolists.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
        ) {
          return
        }
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed"
      })
  },
})
