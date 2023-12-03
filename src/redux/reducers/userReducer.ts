import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import User from '../../types/user/User'
import axios, { AxiosError } from 'axios'
import CreateUserDto from '../../types/user/RegisterUserRequest'
import UsersReducerState from '../../types/user/UsersReducerState'
import toast from 'react-hot-toast'

const initialState: UsersReducerState = {
  users: [],
}

export const getAllUsersAsync = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('getAllUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://api.escuelajs.co/api/v1/users`)
    return response.data
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

export type EmailAvailability = {
  isAvailable: boolean
}

export const checkEmailIsAvailable = createAsyncThunk<
  EmailAvailability,
  string,
  { rejectValue: string }
>('checkEmail', async (mail: string, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `https://api.escuelajs.co/api/v1/users/is-available`,
      {
        email: mail,
      }
    )
    return response.data
  } catch (e) {
    const error = e as AxiosError
    return rejectWithValue(error.message)
  }
})

export const registerUserAsync = createAsyncThunk<
  User,
  CreateUserDto,
  { rejectValue: string }
>('registerUser', async (user: CreateUserDto, { rejectWithValue }) => {
  try {
    // const isAvailable = await dispatch(
    //     checkEmailIsAvailable(user.email)
    // );
    // if (Object.values(isAvailable)) {
    //     throw Error("Email is already registered: This is error");
    // } else {
    const response = await axios.post(
      `http://localhost:3001/api/v1/users/signup`,
      user
    )

    const newUser: User = response.data
    toast.success(`Create new account successfully`)
    console.log(newUser, 'new user created 🧠')
    return newUser
  } catch (e) {
    console.log(e, 'register error 😶‍🌫️')
    const error = e as Error
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
        } else {
          console.log('Email is not available')
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
