import { rest } from 'msw'
import { setupServer } from 'msw/node'

import booksData from '../data/booksData'
import CreateBookDto from '../../types/book/CreateBookRequest'
import categoriesData from '../data/categoriesData'
import Book from '../../types/book/Book'
import UpdateBookRequest from '../../types/book/UpdateBookRequest'

export const handlers = [
  rest.get(`https://api.escuelajs.co/api/v1/books`, (req, res, ctx) => {
    return res(ctx.json(booksData))
  }),

  rest.delete(
    'https://api.escuelajs.co/api/v1/books/:bookId',

    (req, res, ctx) => {
      const { id } = req.params
      if (booksData.find((p) => p.id === id)) {
        return res(ctx.json(true))
      } else {
        return res(ctx.json(false))
      }
    }
  ),
  rest.put(
    `https://api.escuelajs.co/api/v1/Books/:id`,
    async (req, res, ctx) => {
      const update: UpdateBookRequest = await req.json()
      const { id } = req.params

      const index = booksData.findIndex((p) => p.id === id)

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
    }
  ),

  rest.post(`https://api.escuelajs.co/api/v1/Books/`, async (req, res, ctx) => {
    const input: CreateBookDto = await req.json()

    // const category = categoriesData.find((c) => c.id === input.categoryId)
    const category = true

    if (category) {
      const newBook: CreateBookDto = {
        ISBN: '099777035P',
        title: 'something420P',
        edition: '1',
        category: 'something',
        description: 'something',
        publisher: 'something',
        author: ['Someone'],
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
