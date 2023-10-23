/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import axios, { AxiosError, AxiosResponse } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";

import Product from "../types/product/Product";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { addToCart } from "../redux/reducers/cardReducer";
import ModifyProductForm from "../admin/components/ModifyProductForm";
import { deleteProductAsync } from "../redux/services/ProductServices";
import toast, { Toaster } from "react-hot-toast";

const SingleProduct = () => {
    const [product, setProduct] = useState<any>();
    const { productId } = useParams();
    const [openForm, setOpenForm] = useState(false);
    const navigate = useNavigate();

    const admin = useAppSelector((state) => state.authReducer.currentUser);
    const isAdmin = admin?.role === "admin" ? true : false;

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
        toast.success(`Add 1 ${payload.title} to cart`);
    };
    const handleDeleteProduct = (payload: Product) => {
        dispatch(deleteProductAsync(payload.id));
        navigate("/");
        toast.error(`${payload.title} deleted!`);
    };

    return (
        <Box
            sx={{
                marginTop: "50px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Toaster />
            <Box
                sx={{
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
                        {isAdmin ? (
                            <ButtonGroup
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "15px",
                                    width: "fit",
                                }}
                            >
                                <Button
                                    onClick={() => setOpenForm(!openForm)}
                                    size="small"
                                    sx={{
                                        backgroundColor: "lightyellow",
                                        borderRightColor: "#8cbad9",
                                    }}
                                >
                                    Modify product
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (window.confirm("Delete this item?"))
                                            handleDeleteProduct(product);
                                    }}
                                    size="small"
                                    sx={{
                                        backgroundColor: "pink",
                                    }}
                                >
                                    Delete Product
                                </Button>
                            </ButtonGroup>
                        ) : (
                            <Button
                                onClick={() => {
                                    handleAddToCart(product);
                                }}
                                size="small"
                                sx={{ backgroundColor: "black" }}
                            >
                                Add to cart
                            </Button>
                        )}
                    </CardActions>
                    <CardActions>
                        <Button
                            size="small"
                            sx={{ backgroundColor: "lightgreen" }}
                        >
                            <Link to={`/`} style={{ textDecoration: "none" }}>
                                Back to Home
                            </Link>
                        </Button>
                    </CardActions>
                </Card>
            </Box>
            {openForm && <ModifyProductForm product={product} />}
        </Box>
    );
};

export default SingleProduct;
