import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"
import { setAppErrorAC } from "@/app/app-slice.ts"

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  tagTypes: ["Todolist", "Task"],
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", import.meta.env.VITE_API_KEY)
        headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
      },
    })(args, api, extraOptions)

    if (result.error) {
      if (result.error.status === "FETCH_ERROR" || result.error.status === "PARSING_ERROR") {
        api.dispatch(setAppErrorAC({ error: result.error.error }))
      }
      if (result.error.status === 403) {
        api.dispatch(setAppErrorAC({ error: "403 Forbidden Error. Check API-KEY" }))
      }
      if (result.error.status === 400) {
        api.dispatch(setAppErrorAC({ error: (result.error.data as { message: string }).message }))
      }
    }

    return result
  },
  endpoints: () => ({}),
})
