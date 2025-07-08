import { createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "@/common/types"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatus,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading"
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "succeeded"
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.status = "failed"
        },
      )
  },
})
