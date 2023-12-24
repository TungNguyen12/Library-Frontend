import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios, { AxiosError } from 'axios'
import { BASE_URL } from '../../common'
import { CategoryAPI } from '../../types/categories'

// Async Thunk
export const getAllCategoriesAsync = createAsyncThunk<
  CategoryAPI[],
  void,
  { rejectValue: string }
>('getAllCategoriesAsync', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`)
    const categories = response.data
    return categories
  } catch (e) {
    const error = e as AxiosError
    return rejectWithValue(error.message)
  }
})

// Reducer State
export interface CategoriesReducerState {
  categories: CategoryAPI[]
  error?: string
}

export const initialState: CategoriesReducerState = {
  categories: [],
}

// Slice
export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(getAllCategoriesAsync.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

// Reducer
export const categoriesReducer = categoriesSlice.reducer
export default categoriesReducer
