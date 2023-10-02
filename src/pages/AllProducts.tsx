import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProductsAsync } from "../redux/services/ProductServices";

import { addToCart, removeFromCart } from "../redux/reducers/cardReducer";

import { Link } from "react-router-dom";
import Product from "../types/product/Product";
import getTotalQuantity from "../redux/selectors/cart/getTotalQuantity";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
    const [search, setSearch] = useState<string>("");
    const { products, isLoading, error } = useAppSelector(
        (state) => state.productsReducer
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllProductsAsync());
    }, []);

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
            {products.map((product) => (
                <div key={product.id}>
                    <ProductCard product={product} />
                </div>
            ))}
        </>
    );
};

export default AllProducts;
