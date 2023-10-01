import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
} from "../redux/reducers/cardReducer";
import getTotalQuantity from "../redux/selectors/cart/getTotalQuantity";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Stack,
    Typography,
} from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const Cart = () => {
    const cart = useAppSelector((state) => state.cartReducer);
    const dispatch = useAppDispatch();

    const totalQuantity = useAppSelector((state) => getTotalQuantity(state));
    console.log(totalQuantity);

    const handleRemove = (payload: number) => {
        dispatch(removeFromCart(payload));
    };

    const handleIncrement = (payload: number) => {
        dispatch(incrementQuantity(payload));
    };

    const handleDecrement = (payload: number) => {
        dispatch(decrementQuantity(payload));
    };

    return (
        <div>
            {cart.length > 0 && (
                <Stack alignItems={"center"} sx={{ marginTop: "35px" }}>
                    <Box borderBottom={"solid black 1px"}>
                        Minun ostoskorini
                    </Box>

                    <Stack spacing={2} sx={{ marginTop: "15px" }}>
                        {cart.map((item) => (
                            <Card key={item.id} sx={{ display: "flex" }}>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={item.images[0]}
                                    alt={item.title}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <CardContent>
                                        <Stack>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {item.title}
                                            </Typography>

                                            <Stack
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    marginTop: "20px",
                                                }}
                                            >
                                                <Button
                                                    onClick={() =>
                                                        handleDecrement(item.id)
                                                    }
                                                >
                                                    -
                                                </Button>
                                                <Typography>
                                                    {item.quantity}
                                                </Typography>
                                                <Button
                                                    onClick={() =>
                                                        handleIncrement(item.id)
                                                    }
                                                >
                                                    +
                                                </Button>
                                            </Stack>
                                            <Typography>
                                                {item.price}€
                                            </Typography>
                                            <Button
                                                onClick={() =>
                                                    handleRemove(item.id)
                                                }
                                            >
                                                Remove item
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Box>
                            </Card>
                        ))}
                    </Stack>
                </Stack>
            )}
            {cart.length === 0 && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "100px",
                    }}
                >
                    <Stack
                        spacing={1}
                        sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                        <ShoppingCart />
                        <Typography>Ostoskorisi on tyhjä</Typography>
                        <Typography>
                            Ostoskorissasi ei ole mitään. Aloita selaaminen
                            muuttaaksesi sitä!
                        </Typography>
                        <Link to="/">
                            <Button variant="contained" color="success">
                                Osta Muotia
                            </Button>
                        </Link>
                    </Stack>
                </Box>
            )}
        </div>
    );
};

export default Cart;
