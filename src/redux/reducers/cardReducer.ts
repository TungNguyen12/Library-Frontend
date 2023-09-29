import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CartItem from "../../types/cart/CartItem";
import Product from "../../types/product/Product";
import CartReducerState from "../../types/cart/CartReducerState";

const initialState: CartItem[] = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const itemInCart = state.find(
                (item) => item.id === action.payload.id
            );
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },

        incrementQuantity: (state, action: PayloadAction<Product>) => {
            const item = state.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity++;
            }
        },

        decrementQuantity: (state, action: PayloadAction<Product>) => {
            const item = state.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity--;
            }
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            const foundIndex = state.findIndex(
                (item) => item.id === action.payload
            );
            if (foundIndex !== -1) {
                state.splice(foundIndex, 1);
            } else {
                alert("You dont have this in your cart");
            }
        },

        clearCart: (state, action: PayloadAction<void>) => {
            return initialState;
        },
    },
});

const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartReducer;
