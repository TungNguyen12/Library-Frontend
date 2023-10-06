import {
    Box,
    Button,
    CardMedia,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import ProductCard from "../components/ProductCard";
import Product from "../types/product/Product";
import axios, { AxiosError } from "axios";
import { fetchAllCategories } from "../redux/reducers/categoriesReducer";
import { useAppDispatch } from "../hooks/useAppDispatch";

const Categories = () => {
    const categories = useAppSelector(
        (state) => state.categoriesReducer.categories
    );
    const [categoryId, setCategoryId] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([]);

    const dispatch = useAppDispatch();
    const getProductByCategory = async () => {
        try {
            const response = await axios.get(
                `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`
            );
            const productsByCategory = response.data;
            setProducts(productsByCategory);
        } catch (e) {
            const error = e as AxiosError;
            return error.message;
        }
    };

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, []);

    useEffect(() => {
        getProductByCategory();
        console.log(categoryId);
    }, [categoryId]);

    return (
        <>
            <Box sx={{ flexGrow: 1, marginTop: "50px" }}>
                <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                    {categories.map((category) => (
                        <Grid item xs={3}>
                            <Card key={category.id}>
                                <CardActionArea
                                    onClick={() => {
                                        setCategoryId(category.id);
                                    }}
                                >
                                    <CardContent>
                                        {/* <CardMedia
                                    component="img"
                                    height="194"
                                    image={category.image}
                                    alt={category.name}
                                /> */}
                                        <Typography>{category.name}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

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
                            sx={{
                                alignItems: "center",
                                justifyItems: "center",
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

export default Categories;
