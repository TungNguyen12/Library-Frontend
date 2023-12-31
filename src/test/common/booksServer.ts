import { rest } from 'msw'
import { setupServer } from 'msw/node'

import booksData from '../data/booksData'

import { BASE_URL } from '../../common'
import { CreateBookRequest, UpdateBookRequest } from '../../types/books'

export const handlers = [
  rest.get(`${BASE_URL}/books`, (req, res, ctx) => {
    return res(ctx.json(booksData))
  }),

  rest.delete(
    '${BASE_URL}/books/:bookId',

    (req, res, ctx) => {
      const { id } = req.params
      if (booksData.find((p) => p._id === id)) {
        return res(ctx.json(true))
      } else {
        return res(ctx.json(false))
      }
    }
  ),
  rest.put(`${BASE_URL}/Books/:id`, async (req, res, ctx) => {
    const update: UpdateBookRequest = await req.json()
    const { id } = req.params

    const index = booksData.findIndex((p) => p._id === id)

    if (index !== -1) {
      return res(
        ctx.json(
          (booksData[index] = {
            ...booksData[index],
            ...update,
          })
        )
      )
    } else {
      ctx.status(400)
      return res(
        ctx.json({
          message: [
            'price must be a positive number',
            'images must contain at least 1 elements',
            'each value in images must be a URL address',
            'images must be an array',
          ],
          error: 'Bad Request',
          statusCode: 400,
        })
      )
    }
  }),

  rest.post(`${BASE_URL}/Books/`, async (req, res, ctx) => {
    const input: CreateBookRequest = await req.json()

    // const category = categoriesData.find((c) => c.id === input.categoryId)
    const category = true

    if (category) {
      const newBook: any = {
        ISBN: '099777035P',
        title: 'something420P',
        edition: '1',
        category: 'something',
        description: 'something',
        publisher: 'something',
        img: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Doraemon_volume_1_cover.jpg',
        author: 'Someone',
      }
      // booksData.push(newBook) => we don't even need to modify data, it's not in the front
      return res(ctx.json(newBook))
    } else {
      ctx.status(400)
      ctx.json({
        message: [
          'price must be a positive number',
          'images must contain at least 1 elements',
          'each value in images must be a URL address',
          'images must be an array',
        ],
        error: 'Bad Request',
        statusCode: 400,
      })
    }
  }),
]

const server = setupServer(...handlers)

export default server
