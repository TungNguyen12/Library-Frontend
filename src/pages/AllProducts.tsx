import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProductsAsync } from "../redux/services/ProductServices";

import ProductCard from "../components/ProductCard";
import { Box, Grid } from "@mui/material";
import { sortProductByPrice } from "../redux/reducers/productsReducer";

const AllProducts = () => {
    const [search, setSearch] = useState<string>("");
    const { products, isLoading, error } = useAppSelector(
        (state) => state.productsReducer
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllProductsAsync());
    }, []);

    const handleSortByLowerPrice = () => {
        dispatch(sortProductByPrice("asc"));
    };
    const handleSortByHigherPrice = () => {
        dispatch(sortProductByPrice("desc"));
    };

    return (
        <>
            <button onClick={handleSortByLowerPrice}>
                Sort product by lower price{" "}
            </button>
            <button onClick={handleSortByHigherPrice}>
                Sort product by higher price{" "}
            </button>

            <select>
                Sort product
                <option>All product</option>
                <option onChange={handleSortByLowerPrice}>Low to high</option>
                <option onChange={handleSortByHigherPrice}>High to low</option>
            </select>
            <input
                type="text"
                placeholder="Search for product by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Box sx={{ flexGrow: 1, marginTop: "50px" }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {products.map((product) => (
                        <Grid
                            key={product.id}
                            item
                            xs={2}
                            sm={4}
                            md={4}
                            sx={{ alignItems: "center" }}
                        >
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default AllProducts;
