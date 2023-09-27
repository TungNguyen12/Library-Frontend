import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProductsAsync } from "../redux/services/ProductServices";

import store from "../redux/store";
import { addToCart } from "../redux/reducers/cardReducer";

const AllProducts = () => {
    const [search, setSearch] = useState<string>("");
    const [select, setSelect] = useState<number>(1);
    const { products, isLoading, error } = store.getState().productsReducer;

    const cart = useAppSelector((state) => state.cartReducer);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllProductsAsync());
    }, []);

    const handleAddToCart = () => {
        dispatch(addToCart);
        console.log(cart);
    };

    return (
        <div>
            AllProducts ProductsPage
            <button onClick={() => {}}>add new product</button>
            <input
                type="text"
                placeholder="Search for product by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {/* {cart.map(item => {
                <div key={item.id}>
                    <p>{item.title} with price is {item.price}</p>
                </div>
            })} */}
            {products.map((p) => (
                <div key={p.id}>
                    <p>
                        {p.title}'s price is {p.price}
                    </p>
                    <button onClick={() => {}}>Delete Item</button>
                    <button onClick={handleAddToCart}>Add to cart</button>
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
        </div>
    );
};

export default AllProducts;
