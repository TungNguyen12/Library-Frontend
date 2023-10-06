import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import Product from "../types/product/Product";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addToCart } from "../redux/reducers/cardReducer";

const ProductCard: React.FC<any> = ({ product }) => {
    const { id, title, price, description, images, categoryId } = product;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAddToCart = (payload: Product) => {
        dispatch(addToCart(payload));
    };

    return (
        <Card sx={{ maxWidth: 194 }}>
            <CardActions
                onClick={() => {
                    navigate(`/${id}`);
                }}
            >
                <CardMedia
                    component="img"
                    height="194"
                    image={images[0]}
                    alt={title}
                />
            </CardActions>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {title}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {price}€
                </Typography>

                <Button onClick={() => handleAddToCart(product)}>
                    Add to cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
