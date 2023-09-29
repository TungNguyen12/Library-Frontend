import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProductsAsync } from "../redux/services/ProductServices";

import { addToCart, removeFromCart } from "../redux/reducers/cardReducer";

import { Link } from "react-router-dom";
import Product from "../types/product/Product";
import getTotalQuantity from "../redux/selectors/cart/getTotalQuantity";

const AllProducts = () => {
    const [search, setSearch] = useState<string>("");
    const { products, isLoading, error } = useAppSelector(
        (state) => state.productsReducer
    );

    const cartItems = useAppSelector((state) => state.cartReducer);
    const totalQuantity = useAppSelector((state) => getTotalQuantity(state));

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllProductsAsync());
    }, []);

    const handleAddToCart = (payload: Product) => {
        dispatch(addToCart(payload));
        console.log(cartItems);
        console.log(totalQuantity);
    };

    const handleRemove = (payload: number) => {
        dispatch(removeFromCart(payload));
        console.log(cartItems);
        console.log(totalQuantity);
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
            {cartItems &&
                cartItems.map((item) => (
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
                    <button onClick={() => {}}>
                        <Link to={`${p.id}`}>Product detail</Link>
                    </button>
                </div>
            ))}
        </>
    );
};

export default AllProducts;
