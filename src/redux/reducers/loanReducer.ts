import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../common/common'

export type BookInfo = {
  _id: string
  title: string
  img: string
}

export type LoanInfo = {
  borrowed_Date?: string
  returned_Date?: string
  book: BookInfo
  return: boolean
}

export type BorrowBookRequest = {
  id: string[] //array of selected book ID
  accessToken: string
}

export type ReturnBookRequest = {
  id: string[]
  accessToken: string
}

export const returnBooksAsync = createAsyncThunk<
  boolean,
  BorrowBookRequest,
  { rejectValue: string }
>('returnBooksAsync', async ({ id, accessToken }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/books/return`, id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const isReturned = response.data
    console.log(isReturned, 'return books successfully')
    return isReturned
  } catch (e) {
    const error = e as Error
    console.log('something went wrong, check the error')
    return rejectWithValue(error.message)
  }
})

export const getLoanHistoryAsync = createAsyncThunk<
  LoanInfo[],
  string,
  { rejectValue: string }
>('getLoanHistoryAsync', async (accessToken, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/books/history`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const history = response.data
    console.log(history)
    return history
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

export type LoanReducerState = {
  history: LoanInfo[]
  isLoading: boolean
  error?: string
}

const initialState: LoanReducerState = {
  history: [],
  isLoading: false,
}

const loansSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {
    clearHistoryLogout: (state) => {
      state = { ...state, history: [] }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoanHistoryAsync.fulfilled, (state, action) => {
        state = { ...state, history: action.payload, isLoading: false }
      })
      .addCase(getLoanHistoryAsync.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

const loansReducer = loansSlice.reducer
export const { clearHistoryLogout } = loansSlice.actions
export default loansReducer
