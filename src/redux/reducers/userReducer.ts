import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import User from '../../types/user/User'
import axios from 'axios'
import CreateUserDto from '../../types/user/RegisterUserRequest'
import UsersReducerState from '../../types/user/UsersReducerState'
import toast from 'react-hot-toast'
import { BASE_URL } from '../../common/common'

const initialState: UsersReducerState = {
  users: [],
  error: null,
  isLoading: false,
}

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
    console.log(response.data)
    return response.data
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

export const registerUserAsync = createAsyncThunk<
  User,
  CreateUserDto,
  { rejectValue: string }
>('registerUser', async (user: CreateUserDto, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, user)

    const newUser: User = response.data
    toast.success(`Create new account successfully`)
    console.log(newUser, 'new user created 🧠')
    return newUser
  } catch (e) {
    const error = e as Error
    toast.error('❌ Email is taken')
    return rejectWithValue(error.message)
  }
})

// Should be for ADMIN
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

const usersReducer = usersSlice.reducer
export const { clearStateLogout } = usersSlice.actions
export default usersReducer
