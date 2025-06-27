import { Main } from "@/app/Main"
import { Route, Routes } from "react-router"
import { Login } from "@/features/features/auth/ui/Login/Login.tsx"
import { PageNotFound } from "@/common/components/PageNotFound"
import { ProtectedRoute } from "@/common/components/ProtectedRoute/ProtectedRoute.tsx"
import { useAppSelector } from "@/common/hooks"
import { selectIsLoggedIn } from "@/features/features/auth/model/auth-slice.ts"

export const Path = {
  Main: "/",
  Login: "Login",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route
        path={Path.Main}
        element={
          <ProtectedRoute isAllowed={isLoggedIn}>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
