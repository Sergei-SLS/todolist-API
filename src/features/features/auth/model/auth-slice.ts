import { createAppSlice, handleServerNetworkError } from "@/common/utils"
import { LoginInputs } from "@/features/features/auth/lib/schemas"
import { authApi } from "@/features/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums/enums.ts"
import { setAppErrorAC } from "@/app/app-slice.ts"

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
          const res = await authApi.login(data)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppErrorAC({ status: "succeeded" }))
          }
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
