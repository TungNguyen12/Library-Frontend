/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getAllUsersAsync } from "../redux/reducers/userReducer";
import { Box, Button, Stack, Typography } from "@mui/material";
import SearchInput from "../components/SearchInput";
import { ProductPaginationActionsTable } from "../components/ProductPagination";
import { CreateProductForm } from "../components/CreateProductForm";
import { fetchAllProductsAsync } from "../redux/services/ProductServices";

const ProductControl = () => {
    const [search, setSearch] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const allProducts = useAppSelector(
        (state) => state.productsReducer.products
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllProductsAsync());
    }, []);

    const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.toLocaleLowerCase());
    };

    const handleOpenCreateForm = () => {
        setIsOpen(!isOpen);
    };

    const productsToShow = search
        ? allProducts.filter((product) =>
              product.title.toLowerCase().includes(search.toLowerCase())
          )
        : allProducts;

    return (
        <Box>
            <Box
                sx={{
                    alignContent: "center",
                    alignItems: "center",
                    display: " flex",
                    flexDirection: "column",
                    marginTop: "10px",
                }}
            >
                <Stack>
                    <Typography></Typography>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleOpenCreateForm}
                        sx={{ width: "150px" }}
                    >
                        + Create product
                    </Button>
                </Stack>
            </Box>
            {isOpen && <CreateProductForm />}
            <Box
                sx={{
                    alignContent: "center",
                    alignItems: "center",
                    display: " flex",
                    flexDirection: "column",
                    marginTop: "10px",
                }}
            >
                <SearchInput handleSearchProduct={handleSearchProduct} />
                <ProductPaginationActionsTable rows={productsToShow} />
            </Box>
        </Box>
    );
};

export default ProductControl;
