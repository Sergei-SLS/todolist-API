import { Main } from "@/app/Main"
import { Route, Routes } from "react-router"
import { Login } from "@/features/features/auth/ui/Login/Login.tsx"
import { PageNotFound } from "@/common/components/PageNotFound"
import { ProtectedRoute } from "@/common/components/ProtectedRoute/ProtectedRoute.tsx"
import { useAppSelector } from "@/common/hooks"
import { selectIsLoggedIn } from "@/app/app-slice.ts"

export const Path = {
  Main: "/",
  Login: "/Login",
  Faq: "/faq",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.Faq} element={<h2>Faq</h2>} />
      </Route>

      <Route
        path={Path.Login}
        element={
          <ProtectedRoute isAllowed={!isLoggedIn}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
