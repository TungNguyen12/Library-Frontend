import React, { useEffect, useState } from "react";

import axios, { AxiosError, AxiosResponse } from "axios";
import { Link, useParams } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import Product from "../types/product/Product";

const SingleProduct = () => {
    const [product, setProduct] = useState<Product>();
    const { productId } = useParams();

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

    return (
        <Box>
            <div style={{ margin: "5%" }}>
                <Card sx={{ maxWidth: 200 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            {product?.title}
                        </Typography>
                        <Typography variant="h6" component="div">
                            {product?.price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">
                            <Link to={`/`}>Back to Home</Link>
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </Box>
    );
};

export default SingleProduct;
