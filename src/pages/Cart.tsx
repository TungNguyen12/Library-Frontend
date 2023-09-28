import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { removeFromCart } from "../redux/reducers/cardReducer";

const Cart = () => {
    const cart = useAppSelector((state) => state.cartReducer);
    const dispatch = useAppDispatch();

    const handleRemove = (payload: number) => {
        dispatch(removeFromCart(payload));
    };

    return (
        <div>
            {cart &&
                cart.map((item) => (
                    <div key={item.id}>
                        <p>{item.title}</p>
                        <p>{item.price}</p>
                        <p>{item.quantity}</p>
                        <button onClick={() => handleRemove(item.id)}>
                            Remove item
                        </button>
                    </div>
                ))}
            {cart.length === 0 && <div>Cart is empty</div>}
        </div>
    );
};

export default Cart;
