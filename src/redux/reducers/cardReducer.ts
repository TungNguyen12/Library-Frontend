import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CartItem from "../../types/cart/CartItem";
import Product from "../../types/Product";

const initialState: CartItem[] = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const cartItem: CartItem = { ...action.payload, quantity: 1 };

            const foundIndex = state.findIndex(
                (item) => item.id === action.payload.id
            );
            if (foundIndex !== -1) {
                state[foundIndex].quantity++;
            } else {
                state.push(cartItem);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const foundIndex = state.findIndex(
                (item) => item.id === action.payload
            );
            if (foundIndex !== -1) {
                if (state[foundIndex].quantity > 1) {
                    state[foundIndex].quantity--;
                } else {
                    state.splice(foundIndex, 1);
                }
            } else {
                alert("You dont have this in your cart");
            }
        },
    },
});

const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartReducer;
