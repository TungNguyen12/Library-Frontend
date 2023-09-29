import CartItem from "./CartItem";

interface CartReducerState {
    cartItems: CartItem[];
    totalQuantity: number;
    totalCost: number;
}

export default CartReducerState;
