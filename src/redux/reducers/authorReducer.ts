import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../common/common'

export type AuthorAPI = {
  _id: string
  firstName: string
  lastName: string
  book: string[]
  image: string
}

export const getAllAuthorsAsync = createAsyncThunk<
  AuthorAPI[],
  void,
  { rejectValue: any }
>('getAllUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/authors`)
    return response.data
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

type AuthorReducerState = {
  authors: AuthorAPI[]
  isLoading: boolean
  error?: string | undefined
}

export const initialState: AuthorReducerState = {
  authors: [],
  isLoading: false,
}

const AuthorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAuthorsAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          authors: action.payload,
          isLoading: false,
        }
      }
    })
    builder.addCase(getAllAuthorsAsync.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      }
    })
    builder.addCase(getAllAuthorsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          isLoading: false,
          error: action.payload.message,
        }
      }
    })
  },
})

const AuthorReducer = AuthorsSlice.reducer
export default AuthorReducer
