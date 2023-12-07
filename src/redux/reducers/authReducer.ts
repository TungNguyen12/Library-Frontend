import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthJwt } from '../../types/user/AuthJWT'
import User from '../../types/user/User'
import { LoginInterface } from '../../types/user/Login'
import axios from 'axios'
import toast from 'react-hot-toast'

export type AuthState = {
  currentUser: User | null
  // accessToken: string | null
  error?: string | null
}

export const initialState: AuthState = {
  currentUser: null,
  // accessToken: null,
}

export const signinAsync = createAsyncThunk<
  User,
  LoginInterface,
  { rejectValue: string }
>('signinAsync', async ({ email, password }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/users/signin`,
      { email, password }
    )
    const jwtToken = response.data.accessToken
    console.log('🪙: token here:', jwtToken)

    const authenticatedUserProfile = await dispatch(
      getUserProfileAsync(jwtToken)
    )

    if (
      typeof authenticatedUserProfile.payload === 'string' ||
      !authenticatedUserProfile.payload
    ) {
      throw Error(authenticatedUserProfile.payload || 'Cannot login')
    }
    toast.success(`Login successfully`)
    console.log(authenticatedUserProfile)
    return authenticatedUserProfile.payload
  } catch (e) {
    const error = e as Error
    toast.error(`Incorrect input, please try again`)
    return rejectWithValue(error.message)
  }
})

export const getUserProfileAsync = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>('getUserProfileAsync', async (jwtToken, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )

    const userProfile = response.data
    console.log(userProfile)
    return userProfile
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state: AuthState) => {
      state.currentUser = null
    },
  },
  extraReducers: (builder) => {
    //SIGNIN
    builder
      .addCase(signinAsync.fulfilled, (state, action) => {
        state.currentUser = { ...action.payload }
        console.log('auth reducer 😶‍🌫️😶‍🌫️😶‍🌫️', action.payload)
        state.error = null
      })
      .addCase(signinAsync.rejected, (state, action) => {
        state.error = action.payload as string
      })

    //GET USER PROFILE
    builder
      .addCase(getUserProfileAsync.fulfilled, (state, { payload }) => {
        console.log('✅ user profile', payload)
        state.currentUser = { ...payload }
      })
      .addCase(getUserProfileAsync.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { logOut } = authSlice.actions

export const getUserProfile = (state: AuthState) => state.currentUser

const authReducer = authSlice.reducer
export default authReducer
