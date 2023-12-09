import UpdateBookRequest from '../../types/book/UpdateBookRequest'
import CreateBookDto from '../../types/book/CreateBookRequest'
import axios, { AxiosError } from 'axios'

import { createAsyncThunk } from '@reduxjs/toolkit'
import Book from '../../types/book/Book'
import toast from 'react-hot-toast'

// UPDATE
export const updateBookAsync = createAsyncThunk<
  Book,
  UpdateBookRequest,
  { rejectValue: string }
>('updateBook', async ({ id, update, accessToken }, { rejectWithValue }) => {
  console.log(id, update, '🥲')
  try {
    const response = await axios.put<Book>(
      `http://localhost:3000/api/v1/books/${id}`,
      update,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    toast.success(`Modified successfully, refresh to see the updated info`)
    return response.data
  } catch (e) {
    console.log('error here: ❌❌❌❌', e)
    const error = e as AxiosError
    return rejectWithValue(error.message)
  }
})

//DELETE
export const deleteBookAsync = createAsyncThunk(
  'deleteBook',
  async ({ BookId, accessToken }: any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/books/${BookId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
export const createBookAsync = createAsyncThunk<
  Book,
  CreateBookDto,
  { rejectValue: string }
>('createBook', async ({ newBook, accessToken }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/books`,
      newBook,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
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
})

// GET A SINGLE Book
export const fetchSingleBook = createAsyncThunk<
  Book,
  string,
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
