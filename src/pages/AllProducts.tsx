import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProductsAsync } from "../redux/services/ProductServices";

import ProductCard from "../components/ProductCard";
import { Box, Grid } from "@mui/material";
import { sortProductByPrice } from "../redux/reducers/productsReducer";
import SearchInput from "../components/SearchInput";
import { Toaster } from "react-hot-toast";

const AllProducts = () => {
    const [search, setSearch] = useState<string>("");
    const { products, isLoading, error } = useAppSelector(
        (state) => state.productsReducer
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllProductsAsync());
    }, []);

    const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.toLocaleLowerCase());
    };

    const handleSortByLowerPrice = () => {
        dispatch(sortProductByPrice("asc"));
    };
    const handleSortByHigherPrice = () => {
        dispatch(sortProductByPrice("desc"));
    };

    return (
        <>
            <Toaster toastOptions={{ style: { fontFamily: "Roboto" } }} />
            <button onClick={handleSortByLowerPrice}>
                Sort product by lower price{" "}
            </button>
            <button onClick={handleSortByHigherPrice}>
                Sort product by higher price{" "}
            </button>

            <SearchInput handleSearchProduct={handleSearchProduct} />

            <Box
                sx={{
                    flexGrow: 1,
                    marginTop: "50px",
                    height: "412px",
                    width: "65%",
                    margin: "auto",
                }}
            >
                <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
                    {products &&
                        products.map((product) => (
                            <Grid
                                key={product.id}
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
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
