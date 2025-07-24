import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"
import { setAppErrorAC } from "@/app/app-slice.ts"
import { isErrorWithMessage } from "@/common/utils"

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  tagTypes: ["Todolist", "Task"],
  keepUnusedDataFor: 5,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      credentials: "include",
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
      if (result.error.status === 400 || result.error.status === 500) {
        if (isErrorWithMessage(result.error.data)) {
          api.dispatch(setAppErrorAC({ error: result.error.data.message }))
        } else {
          api.dispatch(setAppErrorAC({ error: JSON.stringify(result.error.data) }))
        }
      }
    }
    return result
  },
  endpoints: () => ({}),
})
