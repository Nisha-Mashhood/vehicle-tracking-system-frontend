import { Navigate } from "react-router-dom"
import { isAuthenticated } from "../utils/auth.utils"

interface PublicRouteProps {
  children: React.ReactNode
}

export default function PublicRoute({ children }: PublicRouteProps) {
  if (isAuthenticated()) {
    return <Navigate to="/home" replace />
  }
  return <>{children}</>
}