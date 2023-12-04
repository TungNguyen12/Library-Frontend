import UpdateBookRequest from '../../types/book/UpdateBookRequest'
import CreateBookDto from '../../types/book/CreateBookRequest'
import axios, { AxiosError } from 'axios'

import { createAsyncThunk } from '@reduxjs/toolkit'
import Book from '../../types/book/Book'
import toast from 'react-hot-toast'

// UPDATE
export const updateBookAsync = createAsyncThunk(
  'updateBook',
  async ({ id, update }: UpdateBookRequest, { rejectWithValue }) => {
    console.log(id, update, '🥲')
    try {
      const response = await axios.put<Book>(
        `http://localhost:3000/api/v1/books/${id}`,
        update
      )
      toast.success(`Modified successfully, refresh to see the updated info`)
      return response.data
    } catch (e) {
      console.log('error here: ❌❌❌❌', e)
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)

//DELETE
export const deleteBookAsync = createAsyncThunk(
  'deleteBook',
  async (BookId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/books/${BookId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY5ZTFhOWZlYzZlNTg4NjRhZTg3ZjUiLCJlbWFpbCI6ImFkbWluMkBtYWlsLmNvbSIsImlhdCI6MTcwMTYxMzE2MCwiZXhwIjoxNzAxNjE2NzYwfQ.xewfZbpHN7pPVzLQzTDnFnYbYIt6Fv6PgB1P4Q7VVuM`,
          },
        }
      )
      if (response.data) {
        throw new Error('Cannot delete this Book1')
      }
      toast.success(`Book deleted!`)
      return BookId
    } catch (e) {
      console.log(e, '❌')
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)

// CREATE
export const createBookAsync = createAsyncThunk(
  'createBook',
  async (input: CreateBookDto, { rejectWithValue }) => {
    try {
      const response = await axios.post<Book>(
        `http://localhost:3000/api/v1/books`,
        input
        // {
        //   headers: {
        //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY5ZTFhOWZlYzZlNTg4NjRhZTg3ZjUiLCJlbWFpbCI6ImFkbWluMkBtYWlsLmNvbSIsImlhdCI6MTcwMTYxMzE2MCwiZXhwIjoxNzAxNjE2NzYwfQ.xewfZbpHN7pPVzLQzTDnFnYbYIt6Fv6PgB1P4Q7VVuM`,
        //   },
        // }
      )
      const createdBook: Book = response.data
      console.log(createdBook)
      toast.success(`Create new Book successfully: ${createdBook.title}`)
      return createdBook
    } catch (e) {
      const error = e as AxiosError
      console.log(error)
      toast.error('Failed to create new Book, try again!')
      return rejectWithValue(error.message)
    }
  }
)

// GET A SINGLE Book
export const fetchSingleBook = createAsyncThunk<
  Book,
  number,
  { rejectValue: string }
>('fetchBookByCategories', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/books/${id}`)
    const category = response.data
    return category
  } catch (e) {
    const error = e as AxiosError
    return rejectWithValue(error.message)
  }
})

// GET ALL
export const fetchAllBooksAsync = createAsyncThunk(
  'fetchAllBooksAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/books`)
      const data: Book[] = response.data.data
      return data
    } catch (e) {
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)
