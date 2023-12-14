import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CategoryAPI from '../../types/category/CategoryAPI'
import axios, { AxiosError } from 'axios'
import { BASE_URL } from '../../common/common'

// GET CATEGORY
export const getAllCategories = createAsyncThunk<
  CategoryAPI[],
  void,
  { rejectValue: string }
>('getAllCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`)
    const category = response.data
    console.log(category)
    return category
  } catch (e) {
    const error = e as AxiosError
    return rejectWithValue(error.message)
  }
})

export interface CategoriesReducerState {
  categories: CategoryAPI[]
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
