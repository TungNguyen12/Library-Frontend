import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { LoginInterface } from '../../types/user/Login'
import usersData from '../data/usersData'
import { BASE_URL } from '../../common/common'

export const accessToken = 'user-access-token'

export const handlers = [
  rest.post(`${BASE_URL}/users/signin`, async (req, res, ctx) => {
    const { email, password }: LoginInterface = await req.json<LoginInterface>()
    const foundUser = usersData.find(
      (u) => u.email === email && u.password === password
    )
    if (foundUser) {
      const token = accessToken + '_' + foundUser.email
      return res(ctx.json({ accessToken: token }))
    } else {
      ctx.status(401)
      return res(ctx.json({}))
    }
  }),

  rest.get(`${BASE_URL}/users/profile`, (req, res, ctx) => {
    const token = req.headers.get('Authorization')?.split(' ')[1]
    const originalToken = token?.split('_')[0]
    const userEmail = token?.split('_')[1]
    const user = usersData.find((u) => u.email === userEmail)
    if (originalToken === accessToken && user) {
      return res(ctx.json(user))
    } else {
      ctx.status(401)
      return res(ctx.json(null))
    }
  }),

  // rest.put(`${BASE_URL}/users/update`, async (req, res, ctx) => {
  //   const token = req.headers.get('Authorization')?.split(' ')[1]
  //   const update = req
  //   const originalToken = token?.split('_')[0]
  //   const userEmail = token?.split('_')[1]
  // }),
]

const authServer = setupServer(...handlers)

export default authServer
