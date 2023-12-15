import User from './User'

type UsersReducerState = {
  users: User[]
  error?: string | null
  isLoading: boolean
}

export default UsersReducerState
