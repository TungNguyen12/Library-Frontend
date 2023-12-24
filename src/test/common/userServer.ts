import { rest } from 'msw'
import { setupServer } from 'msw/node'

import usersData from '../data/usersData'

import { BASE_URL } from '../../common'
import { CreateUserRequest } from '../../types/users'

export const handlers = [
  //GET ALL USERS
  rest.get(`${BASE_URL}/users`, (req, res, ctx) => {
    return res(ctx.json(usersData))
  }),

  //REGISTER NEW USER
  rest.post(`${BASE_URL}/users/`, async (req, res, ctx) => {
    const input: CreateUserRequest = await req.json()

    const user = usersData.find((user) => user.email === input.email)
    if (user) {
      const newUser = {
        ...input,
        role: 'customer',
      }
      return res(ctx.json(newUser))
    } else {
      ctx.status(400)
      return res(
        ctx.json({
          message: [
            'email must be an email',
            'role must be one of the following values: admin, customer',
            'avatar must be a URL address',
          ],
          error: 'Bad Request',
          statusCode: 400,
        })
      )
    }
  }),
]

const userServer = setupServer(...handlers)

export default userServer
