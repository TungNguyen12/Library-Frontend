import { UpdateUserDto } from './User'

type UpdateUserRequest = {
  update: UpdateUserDto
  accessToken: string
}

export default UpdateUserRequest
