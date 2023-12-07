import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CartItem from '../../types/cart/CartItem'
import Product from '../../types/book/Book'
import Book from '../../types/book/Book'
import axios from 'axios'
import toast from 'react-hot-toast'

const initialState: Book[] = []

export const addBookToCartDBAsync = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>('addBookToCartDBAsync', async ({ jwtToken, userId }, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/carts/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )

    const book = response.data
    console.log('book returned after send req to cart db: 🤔✅:', book)
    return book
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Book>) => {
      const itemInCart = state.find((item) => item._id === action.payload._id)
      if (!itemInCart) {
        state.push(action.payload)
        toast.success(`Add ${action.payload.title} to my cart`)
      } else {
        toast.error('You only can borrow one of this book at a time')
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const foundIndex = state.findIndex((item) => item._id === action.payload)
      if (foundIndex !== -1) {
        state.splice(foundIndex, 1)
      } else {
        alert('You dont have this in your cart')
      }
    },

    clearCart: (state) => {
      return (state = [])
    },
  },
})

const cartReducer = cartSlice.reducer
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartReducer
