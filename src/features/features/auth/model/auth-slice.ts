import { createAppSlice, handleServerNetworkError } from "@/common/utils"
import { LoginInputs } from "@/features/features/auth/lib/schemas"
import { authApi } from "@/features/features/auth/api/authApi.ts"
import { AUTH_TOKEN } from "@/common/constants"
import { changeStatusAC } from "@/app/app-slice"
import { ResultCode } from "@/common/enums/enums.ts"

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: LoginInputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await authApi.login(data)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusAC({ status: "succeeded" }))
          }
          localStorage.setItem(AUTH_TOKEN, res.data.data.token)
          return { isLoggedIn: true }
        } catch (error) {
          handleServerNetworkError(dispatch, error)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
  }),
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC } = authSlice.actions
export const authReducer = authSlice.reducer
