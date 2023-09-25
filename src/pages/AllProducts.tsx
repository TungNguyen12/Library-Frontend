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

const AllProducts = () => {
    const [search, setSearch] = useState<string>("");
    const [select, setSelect] = useState<number>(1);
    const { products, isLoading, error } = useAppSelector(
        (state) => state.productsReducer
    );

    const filteredProductsByTitle = useAppSelector((state) =>
        getProductsByTitle(state, search)
    );

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllProductsAsync());
    }, []);

    // useEffect(() => {
    //     dispatch(
    //         createProductAsync({
    //             title: "Pete Pete Pete",
    //             price: 687,
    //             description: "Andy shoes are designed to keeping PETE in...",
    //             categoryId: 3,
    //             images: [
    //                 "https://placeimg.com/640/480/any?r=0.9178516507833767",
    //                 "https://placeimg.com/640/480/any?r=0.9300320592588625",
    //                 "https://placeimg.com/640/480/any?r=0.8807778235430017",
    //             ],
    //         })
    //     );
    // }, []);

    // useEffect(() => {
    //     dispatch(deleteProductAsync(2260));
    // }, []);

    // console.log("all products are: ", products);

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
