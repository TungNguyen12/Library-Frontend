import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CartItem from "../../types/cart/CartItem";
import Product from "../../types/product/Product";

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

        incrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.find((item) => item.id === action.payload);
            if (item) {
                item.quantity++;
            }
        },

        decrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.find((item) => item.id === action.payload);

            const foundIndex = state.findIndex(
                (item) => item.id === action.payload
            );

            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    state.splice(foundIndex, 1);
                }
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

        clearCart: (state) => {
            return (state = []);
        },
    },
});

const cartReducer = cartSlice.reducer;
export const {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
} = cartSlice.actions;
export default cartReducer;
