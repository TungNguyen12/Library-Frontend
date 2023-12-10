import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Category from '../../types/book/Category'
import axios, { AxiosError } from 'axios'
import { BASE_URL } from '../../common/common'

// GET CATEGORY
export const getAllCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>('getAllCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`)
    const category = response.data
    return category
  } catch (e) {
    const error = e as AxiosError
    return rejectWithValue(error.message)
  }
})

export interface CategoriesReducerState {
  categories: Category[]
  error?: string
}

export const initialState: CategoriesReducerState = {
  categories: [],
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const categoriesReducer = categoriesSlice.reducer
export default categoriesReducer
