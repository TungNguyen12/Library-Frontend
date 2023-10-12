/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProductsAsync } from "../redux/services/ProductServices";
import { sortProductByPrice } from "../redux/reducers/productsReducer";

import ProductCard from "../components/ProductCard";
import SearchInput from "../components/SearchInput";
import { Box, Button, Grid } from "@mui/material";

import { Toaster } from "react-hot-toast";

const AllProducts = () => {
    const [search, setSearch] = useState<string>("");
    const { products } = useAppSelector((state) => state.productsReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllProductsAsync());
    }, []);

    const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.toLocaleLowerCase());
    };

    const productsToShow = useMemo(() => {
        return search
            ? products.filter((product) =>
                  product.title.toLowerCase().includes(search.toLowerCase())
              )
            : products;
    }, [search, products]);

    const handleSortByLowerPrice = () => {
        dispatch(sortProductByPrice("asc"));
    };
    const handleSortByHigherPrice = () => {
        dispatch(sortProductByPrice("desc"));
    };

    return (
        <Box sx={{ width: "70%", margin: "auto" }}>
            <Toaster toastOptions={{ style: { fontFamily: "Roboto" } }} />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    margin: " 50px",
                }}
            >
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSortByLowerPrice}
                >
                    Sort by lower price{" "}
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSortByHigherPrice}
                >
                    Sort by higher price{" "}
                </Button>

                <SearchInput handleSearchProduct={handleSearchProduct} />
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    marginTop: "50px",
                    height: "412px",
                    margin: "auto",
                }}
            >
                <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
                    {products &&
                        productsToShow.map((product) => (
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
        </Box>
    );
};

export default AllProducts;
