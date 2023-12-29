import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../common'
import toast from 'react-hot-toast'
import { BorrowBookRequest, LoanInfo, ReturnedHistory } from '../../types/loans'


// Async Thunks
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
    toast.success('Borrowed')
    return isReturned
  } catch (e) {
    const error = e as Error
    toast.error(error.message)
    return rejectWithValue(error.message)
  }
})

export const getLoanHistoryAsync = createAsyncThunk<
  ReturnedHistory,
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
    return history as ReturnedHistory
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

// Reducer State
export type LoanReducerState = {
  history: LoanInfo[]
  isLoading: boolean
  error?: string | null
}

// Initial State
const initialState: LoanReducerState = {
  history: [],
  isLoading: false,
  error: null,
}

// Slice
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
        state.history = action.payload.history
        state.isLoading = false
      })
      .addCase(getLoanHistoryAsync.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getLoanHistoryAsync.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
  },
})

// Actions
export const { clearHistoryLogout } = loansSlice.actions

// Reducer
const loansReducer = loansSlice.reducer
export default loansReducer
