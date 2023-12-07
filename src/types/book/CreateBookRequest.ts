import Book from './Book'

type CreateBookDto = Omit<Book, '_id' | 'author' | 'category'> & {
  author: string
  category: string
}

export default CreateBookDto
