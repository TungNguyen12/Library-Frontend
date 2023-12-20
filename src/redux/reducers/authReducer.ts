import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'
import { BASE_URL } from '../../common'
import User, { UpdateUserDto } from '../../types/user/User'
import { LoginInterface } from '../../types/user/Login'
import UpdateUserRequest from '../../types/user/UpdateUserRequest'

// Types
export type AuthState = {
  currentUser: User | null
  accessToken: string | null
  error?: string | null
}

// Initial State
export const initialState: AuthState = {
  currentUser: null,
  accessToken: null,
}

// Async Thunks
export const signinAsync = createAsyncThunk<
  AuthState,
  LoginInterface,
  { rejectValue: string }
>('signinAsync', async ({ email, password }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signin`, {
      email,
      password,
    })
    const jwtToken = response.data.accessToken as string

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

    const result = {
      currentUser: authenticatedUserProfile.payload,
      accessToken: jwtToken,
    }
    return result
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
    const response = await axios.get(`${BASE_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
    const userProfile = response.data
    return userProfile
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

export const updateUserAsync = createAsyncThunk<
  AuthState,
  UpdateUserRequest,
  { rejectValue: string }
>(
  'updateUserAsync',
  async ({ update, accessToken }, { rejectWithValue, dispatch }) => {
    try {
      await axios.put(`${BASE_URL}/users/update`, update, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      const newProfile = await dispatch(getUserProfileAsync(accessToken))

      if (typeof newProfile.payload === 'string' || !newProfile.payload) {
        throw Error(newProfile.payload || 'Cannot update')
      }

      toast.success(`Update successfully`)

      const result = {
        currentUser: newProfile.payload,
        accessToken: accessToken,
      }
      return result
    } catch (e) {
      const error = e as Error
      return rejectWithValue(error.message)
    }
  }
)

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state: AuthState) => {
      state.currentUser = null
      state.accessToken = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // SIGNIN
    builder
      .addCase(signinAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload.currentUser
        state.accessToken = action.payload.accessToken
        state.error = null
      })
      .addCase(signinAsync.rejected, (state, action) => {
        state.error = action.payload as string
      })

    // UPDATE PROFILE
    builder
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload.currentUser
        state.error = null
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.error = action.payload as string
      })

    // GET USER PROFILE
    builder
      .addCase(getUserProfileAsync.fulfilled, (state, { payload }) => {
        state.currentUser = { ...payload }
        state.error = null
      })
      .addCase(getUserProfileAsync.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

// Actions
export const { logOut } = authSlice.actions

// Selector
export const getUserProfile = (state: AuthState) => state.currentUser

// Reducer
const authReducer = authSlice.reducer
export default authReducer
