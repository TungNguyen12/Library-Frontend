import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector'

const CheckRole = ({ children, role }: any) => {
  const validUser = useAppSelector((state) => state.authReducer.currentUser)

  return validUser?.role[0].title === role ? (
    children
  ) : (
    <Navigate to="/Library-Frontend/signin" />
  )
}

export default CheckRole
