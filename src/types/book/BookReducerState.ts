import Book from './Book'

type BookReducerState = {
  books: Book[]
  isLoading: boolean
  error?: string | undefined
}

export default BookReducerState
