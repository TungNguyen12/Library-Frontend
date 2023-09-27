import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProductsAsync } from "../redux/services/ProductServices";

import store from "../redux/store";
import { addToCart, removeFromCart } from "../redux/reducers/cardReducer";
import CartItem from "../types/cart/CartItem";
import Product from "../types/Product";

const AllProducts = () => {
    const [search, setSearch] = useState<string>("");
    const { products, isLoading, error } = store.getState().productsReducer;

    const cart: CartItem[] = useAppSelector((state) => state.cartReducer);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllProductsAsync());
        console.log(products);
    }, []);

    const handleAddToCart = (payload: Product) => {
        dispatch(addToCart(payload));
        console.log(cart);
    };
    const handleRemove = (payload: number) => {
        dispatch(removeFromCart(payload));
        console.log(cart);
    };

    return (
        <>
            AllProducts ProductsPage
            <button onClick={() => {}}>add new product</button>
            <input
                type="text"
                placeholder="Search for product by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {cart &&
                cart.map((item) => (
                    <div key={item.id}>
                        <p>
                            {item.title} with price is {item.price} ---
                            quantity: {item.quantity}
                        </p>
                        <button onClick={() => handleRemove(item.id)}>
                            Remove item
                        </button>
                    </div>
                ))}
            {products.map((p) => (
                <div key={p.id}>
                    <p>
                        {p.title}'s price is {p.price}
                    </p>
                    <button onClick={() => {}}>Delete Item</button>
                    <button onClick={() => handleAddToCart(p)}>
                        Add to cart
                    </button>
                </div>
            ))}
            {/* <select
                value={select}
                onChange={(e) => setSelect(Number(e.target.value))}
            >
                {" "}
                Categories
                <option value="1" key="1">
                    1
                </option>
                <option value="2" key="2">
                    2
                </option>
                <option value="3" key="3">
                    3
                </option>
                <option value="4" key="4">
                    4
                </option>
                <option value="5" key="5">
                    5
                </option>
            </select> */}
            {/* {filterProducts.map((p) => (
                <div key={p.id}>
                    <p>
                        {p.title}'s price is {p.price} and Categories is{" "}
                        {p.category.id} and {p.category.name}
                    </p>
                </div>
            ))} */}
        </>
    );
};

export default AllProducts;
