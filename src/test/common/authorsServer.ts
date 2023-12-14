import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'

import { BASE_URL } from '../../common/common'
import authorsData from '../data/authorsData'

export const handlers = [
  //Get All Authors
  rest.get(`${BASE_URL}/authors`, (req, res, ctx) => {
    return res(ctx.json(authorsData))
  }),
]

const authorsServer = setupServer(...handlers)

export default authorsServer
