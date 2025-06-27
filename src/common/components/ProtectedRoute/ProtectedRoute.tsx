import { Navigate, Outlet } from "react-router"
import { Path } from "@/common/routing/Routing.tsx"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
  isAllowed: boolean
}

export const ProtectedRoute = ({ children, isAllowed }: Props) => {
  if (!isAllowed) {
    return <Navigate to={Path.Login} />
  }
  return children ? children : <Outlet />
}
