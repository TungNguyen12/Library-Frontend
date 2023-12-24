import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import User, { CreateUserRequest } from '../../types/users'
import axios from 'axios'
import toast from 'react-hot-toast'
import { BASE_URL } from '../../common'

export type UsersReducerState = {
  users: User[]
  error?: string | null
  isLoading: boolean
}

// Async Thunks
export const getAllUsersAsync = createAsyncThunk<
  User[],
  string,
  { rejectValue: string }
>('getAllUsers', async (accessToken, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

export const registerUserAsync = createAsyncThunk<
  User,
  CreateUserRequest,
  { rejectValue: string }
>('registerUser', async (user: CreateUserRequest, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, user)

    const newUser: User = response.data
    toast.success(`Create new account successfully`)
    return newUser
  } catch (e) {
    const error = e as Error
    toast.error('❌ Email is taken')
    return rejectWithValue(error.message)
  }
})

// Reducer State
const initialState: UsersReducerState = {
  users: [],
  error: null,
  isLoading: false,
}

// Slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearStateLogout: (state) => {
      state.users = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        const newUser = action.payload
        if (!state.users.find((user) => user.email === newUser.email)) {
          state.users.push(newUser)
        }
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.error = action.payload
      })

      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

// Actions
export const { clearStateLogout } = usersSlice.actions

// Reducer
const usersReducer = usersSlice.reducer
export default usersReducer
