import { EnumType } from 'typescript'

export enum Roles {}
export type IFormInput = {
  firstName: string
  lastName: string
  email: string
  address: string
  phoneNumber: string
  password: string
  avatar: string
  role: 'admin' | 'customer'
}

type User = IFormInput & {
  id: string
}

export default User
