export type Role = {
  id: string
  title: string
}

export type IFormInput = {
  firstName: string
  lastName: string
  email: string
  address: string
  phoneNumber: string
  password: string
  avatar: string
  role: Role[]
}

export type Credentials = {
  email: string
  password: string
}

export type UpdateUserDto = Partial<
  Omit<IFormInput, 'role' | 'email' | 'password'>
>

export type UpdateUserRequest = {
  update: UpdateUserDto
  accessToken: string
}

export type CreateUserRequest = Omit<User, 'role' | 'id'> & {
  confirmPassword: string
}

type User = IFormInput & {
  id: string
}

export default User
