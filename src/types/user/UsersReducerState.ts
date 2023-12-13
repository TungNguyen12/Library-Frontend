import User from './User'

export default interface UsersReducerState {
  users: User[]
  error?: string | null
  isLoading: boolean
}
