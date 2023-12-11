import Book from './Book'

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
