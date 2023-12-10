import UpdateBookRequest from '../../types/book/UpdateBookRequest'
import CreateBookDto from '../../types/book/CreateBookRequest'
import axios, { AxiosError } from 'axios'

import { createAsyncThunk } from '@reduxjs/toolkit'
import Book from '../../types/book/Book'
import toast from 'react-hot-toast'
import { BASE_URL } from '../../common/common'

// UPDATE
export const updateBookAsync = createAsyncThunk<
  Book,
  UpdateBookRequest,
  { rejectValue: string }
>('updateBook', async ({ id, update, accessToken }, { rejectWithValue }) => {
  console.log(id, update, '🥲')
  try {
    const response = await axios.put<Book>(`${BASE_URL}/books/${id}`, update, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    toast.success(`Modified successfully, refresh to see the updated info`)
    return response.data
  } catch (e) {
    console.log('error here: ❌❌❌❌', e)
    const error = e as AxiosError
    return rejectWithValue(error.message)
  }
})

type DeleteBookRequest = {
  bookId: string
  accessToken: string
}

//DELETE
export const deleteBookAsync = createAsyncThunk<
  string,
  DeleteBookRequest,
  { rejectValue: string }
>('deleteBook', async ({ bookId, accessToken }, { rejectWithValue }) => {
  try {
    await axios.delete(`${BASE_URL}/books/${bookId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    toast.success(`Book deleted!`)
    return bookId
  } catch (e) {
    console.log(e, '❌')
    const error = e as AxiosError
    return rejectWithValue(error.message)
  }
})

// CREATE
export const createBookAsync = createAsyncThunk<
  Book,
  CreateBookDto,
  { rejectValue: string }
>('createBook', async ({ newBook, accessToken }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/books`, newBook, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
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
    const response = await axios.get(`${BASE_URL}/books/${id}`)
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
      const response = await axios.get(`${BASE_URL}/books`)
      const data: Book[] = response.data.data
      return data
    } catch (e) {
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)
