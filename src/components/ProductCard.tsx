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
import { Link } from "react-router-dom";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<any> = ({ product, handleAddToCart }) => {
    const { id, title, price, description, images, categoryId } = product;

    return (
        <Card sx={{ maxWidth: 194 }}>
            <CardActions>
                <Link to={`${id}`}>
                    <CardMedia
                        component="img"
                        height="194"
                        image={images[0]}
                        alt={title}
                    />
                </Link>
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
