import Book from './Book'

type CreateBookDto = Omit<Book, '_id' | 'author'> & { author: string }

export default CreateBookDto
