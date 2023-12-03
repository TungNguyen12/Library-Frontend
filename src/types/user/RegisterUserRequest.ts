import User from './User'

type CreateUserDto = Omit<User, 'role' | 'id'> & { confirmPassword: string }

export default CreateUserDto
