import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
    createProductAsync,
    deleteProductAsync,
    fetchAllProductsAsync,
} from "../redux/services/ProductServices";
import getProductsByTitle from "../redux/selectors/getProductsByTitle";
import Product from "../types/Product";
import { initialState } from "../redux/reducers/productsReducer";
import store from "../redux/store";
import { $CombinedState } from "@reduxjs/toolkit";

const AllProducts = () => {
    const [search, setSearch] = useState<string>("");
    const [select, setSelect] = useState<number>(1);
    const { products, isLoading, error } = store.getState().productsReducer;
    console.log(products);

    const state = useAppSelector((state) => state);

    console.log(state.productsReducer);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllProductsAsync());
    }, []);

    return (
        <div>
            AllProducts ProductsPage
            <button onClick={() => {}}>add new product</button>
            {/* <button onClick={ascSorted}>Sort by ascending</button>
            <button onClick={descSorted}>Sort by descending</button> */}
            <input
                type="text"
                placeholder="Search for product by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {products.map((p) => (
                <div key={p.id}>
                    <p>
                        {p.title}'s price is {p.price}
                    </p>
                    <button onClick={() => {}}>Delete Item</button>
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
