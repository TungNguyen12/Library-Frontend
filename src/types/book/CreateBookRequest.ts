import Book from './Book'

export type CreateBookDto = Omit<Book, '_id' | 'author' | 'category'> & {
  author: string[]
  category: string
}

type CreateBookRequest = {
  newBook: CreateBookDto
  accessToken: string
}

export default CreateBookRequest
