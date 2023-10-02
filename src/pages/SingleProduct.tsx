import React, { useEffect, useState } from "react";

import axios, { AxiosError, AxiosResponse } from "axios";
import { Link, useParams } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import Product from "../types/product/Product";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addToCart } from "../redux/reducers/cardReducer";

const SingleProduct = () => {
    const [product, setProduct] = useState<any>();
    const { productId } = useParams();

    const dispatch = useAppDispatch();

    const fetchSingleProduct = async () => {
        try {
            const response = await axios.get<any, AxiosResponse<Product>>(
                `https://api.escuelajs.co/api/v1/products/${productId}`
            );
            const data: Product = response.data;
            setProduct(data);
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    };

    useEffect(() => {
        fetchSingleProduct();
    }, [productId]);

    const handleAddToCart = (payload: Product) => {
        dispatch(addToCart(payload));
    };

    return (
        <Box
            sx={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Card>
                <CardMedia
                    component="img"
                    height="350"
                    image={product?.images[0]}
                    alt={product?.title}
                />
            </Card>
            <Card sx={{ maxWidth: 300 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {product?.title}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {product?.price}€
                    </Typography>
                </CardContent>

                <CardActions sx={{ display: "flex" }}>
                    <Button
                        onClick={() => {
                            handleAddToCart(product);
                        }}
                        sx={{ backgroundColor: "black" }}
                    >
                        Add to cart
                    </Button>
                </CardActions>
                <CardActions>
                    <Button size="small">
                        <Link to={`/`} style={{ textDecoration: "none" }}>
                            Back to Home
                        </Link>
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default SingleProduct;
