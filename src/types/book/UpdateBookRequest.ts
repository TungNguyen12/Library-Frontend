import Book from './Book'

type UpdateBookDto = Partial<Book>

type UpdateBookRequest = {
  id: string
  update: UpdateBookDto
}

export default UpdateBookRequest
