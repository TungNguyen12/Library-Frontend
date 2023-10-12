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
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addToCart } from "../redux/reducers/cardReducer";
import toast from "react-hot-toast";

const ProductCard: React.FC<any> = ({ product }) => {
    const { id, title, price, images } = product;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAddToCart = (payload: Product) => {
        dispatch(addToCart(payload));
        toast(`Add 1 ${payload.title} to cart`, {
            icon: "✅",
        });
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
                    height="250"
                    image={images[0]}
                    alt={title}
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        borderRadius: "0.5rem",
                    }}
                />
            </CardActions>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {title}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Price: {price}€
                </Typography>

                <Button onClick={() => handleAddToCart(product)}>
                    Add to cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
