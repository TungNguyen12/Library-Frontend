import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'

import categoriesData from '../data/categoriesData'
import { BASE_URL } from '../../common/common'

export const handlers = [
  //Get All Categories
  rest.get(`${BASE_URL}/categories`, (req, res, ctx) => {
    return res(ctx.json(categoriesData))
  }),
]

const categoriesServer = setupServer(...handlers)

export default categoriesServer
