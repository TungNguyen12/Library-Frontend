import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../common/common'
import { AuthorAPI } from '../../types/author/AuthorAPI'

export const getAllAuthorsAsync = createAsyncThunk<
  AuthorAPI[],
  void,
  { rejectValue: any }
>('getAllUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/authors`)
    console.log(response.data)
    return response.data
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

type AuthorReducerState = {
  authors: AuthorAPI[]
  isLoading: boolean
  error?: string
}

export const initialState: AuthorReducerState = {
  authors: [],
  isLoading: false,
}

const authorsSlice = createSlice({
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

const authorsReducer = authorsSlice.reducer
export default authorsReducer
