import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import toast from 'react-hot-toast'
import { Book } from '../../types/books'

// Initial State
const initialState: Book[] = []

// Slice
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
        toast.error('You can only borrow one of this book at a time')
      }
    },

    removeFromCart: (state, action: PayloadAction<Book>) => {
      const foundIndex = state.findIndex(
        (item) => item._id === action.payload._id
      )
      if (foundIndex !== -1) {
        state.splice(foundIndex, 1)
      } else {
        alert('You do not have this in your cart')
      }
    },

    clearCart: (state) => {
      return (state = [])
    },
  },
})

// Reducer
const cartReducer = cartSlice.reducer

// Actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartReducer
