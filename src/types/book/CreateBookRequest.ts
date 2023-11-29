import Book from './Book'

type CreateBookDto = Omit<Book, '_id'>

export default CreateBookDto
