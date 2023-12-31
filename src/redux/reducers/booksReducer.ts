import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  createBookAsync,
  deleteBookAsync,
  getAllBooksAsync,
  updateBookAsync,
} from '../services/BookServices'

import { Book } from '../../types/books'

export type BookReducerState = {
  books: Book[]
  isLoading: boolean
  error?: string
}

export const initialState: BookReducerState = {
  books: [],
  isLoading: false,
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    sortBookByTitle: (state, action: PayloadAction<'asc' | 'desc'>) => {
      if (action.payload === 'asc') {
        state.books.sort((a, b) => a.title.localeCompare(b.title))
      } else {
        state.books.sort((a, b) => b.title.localeCompare(a.title))
      }
    },
  },
  extraReducers: (builder) => {
    // getAllBooksAsync
    builder.addCase(getAllBooksAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          books: action.payload,
          isLoading: false,
        }
      }
    })
    builder.addCase(getAllBooksAsync.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      }
    })
    builder.addCase(getAllBooksAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          isLoading: false,
          error: action.payload.message,
        }
      }
    })

    //createBookAsync ADMIN
    builder.addCase(createBookAsync.fulfilled, (state, action) => {
      state.books.push(action.payload)
    })
    builder.addCase(createBookAsync.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      }
    })
    builder.addCase(createBookAsync.rejected, (state, action) => {
      state.error = action.payload as string
    })

    //deleteBookAsync ADMIN
    builder.addCase(deleteBookAsync.fulfilled, (state, action) => {
      const foundIndex = state.books.findIndex((book) => {
        book._id === action.payload.toString()
      })
      if (foundIndex !== -1) {
        const newBookList = state.books.splice(foundIndex, 1)
        return {
          ...state,
          books: newBookList,
          isLoading: false,
        }
      }
    })
    builder.addCase(deleteBookAsync.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      }
    })
    builder.addCase(deleteBookAsync.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    })

    //updateBookAsync ADMIN
    builder.addCase(updateBookAsync.fulfilled, (state, action) => {
      const updatedBook = action.payload
      const updatedBooksList = state.books.map((book) => {
        if (book._id === updatedBook._id) {
          return updatedBook
        } else {
          return book
        }
      })
      return {
        ...state,
        books: updatedBooksList,
        isLoading: false,
      }
    })
  },
})

const booksReducer = booksSlice.reducer
export const { sortBookByTitle } = booksSlice.actions
export default booksReducer
