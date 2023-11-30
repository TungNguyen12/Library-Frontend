import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { LoginInterface } from '../../types/user/Login'
import usersData from '../data/usersData'

export const access_token = 'user-access-token'

export const handlers = [
  rest.post(
    `https://api.escuelajs.co/api/v1/auth/login`,
    async (req, res, ctx) => {
      const { email, password }: LoginInterface = await req.json()
      console.log(email, password)

      const foundUser = usersData.find(
        (u) => u.email === email && u.password === password
      )

      if (foundUser) {
        const token = access_token + '_' + foundUser.id
        return res(ctx.json({ access_token: token }))
      } else {
        ctx.status(401)
        return res(ctx.text('Cannot authenticate user'))
      }
    }
  ),

  rest.get(`https://api.escuelajs.co/api/v1/auth/profile`, (req, res, ctx) => {
    const token = req.headers.get('Authorization')?.split(' ')[1]
    const originalToken = token?.split('_')[0]
    const userId = token?.split('_')[1]
    const user = usersData.find((u) => u.id === userId)
    if (originalToken === access_token && user) {
      return res(ctx.json(user))
    } else {
      ctx.status(401)
      return res(ctx.text('Cannot authenticate user'))
    }
  }),
]

const authServer = setupServer(...handlers)

export default authServer
