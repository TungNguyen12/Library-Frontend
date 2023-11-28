import Book from './Book'

type CreateBookDto = Omit<Book, 'id'>

export default CreateBookDto
