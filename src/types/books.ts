import { Author } from './authors'
import { CategoryAPI } from './categories'

export type Book = {
  _id: string
  ISBN: string
  title: string
  edition: string
  category: CategoryAPI[]
  description: string
  publisher: string
  img: string
  author: Author[]
}

export type CreateBookDto = Omit<Book, '_id' | 'author' | 'category'> & {
  author: string[]
  category: string
}

export type CreateBookRequest = {
  newBook: CreateBookDto
  accessToken: string
}

export type DeleteBookRequest = {
  bookId: string
  accessToken: string
}

type UpdateBookDto = Partial<Book>

export type UpdateBookRequest = {
  id: string
  accessToken: string
  update: UpdateBookDto
}

export type AllBookApi = {
  perPage: number
  page: number
  totalCount: number
  totalPageCount: number
  data: Book[]
}

export type FetchBooksPaginatedAndFiltered = {
  page: number
  perPage: number
  searchQuery?: string
  authorName?: string
  categoryName?: string
  edition?: string
  publisher?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export type PaginatedData<T> = {
  data: [T]
  page: number
  perPage: number
  totalCount: number
  totalPageCount: number
}
export type FilterBooksOptions = {
  perPage: number
  page: number
  search: string
  sortOrder: string
  authorName: string
  categoryName: string
}
