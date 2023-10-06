import React from "react";

import Login from "./Login";
import { useAppSelector } from "../hooks/useAppSelector";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Stack,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const validUser = useAppSelector((state) => state.authReducer.currentUser);
    const navigate = useNavigate();
    return (
        <div>
            {validUser ? (
                <Stack alignItems={"center"} sx={{ marginTop: "35px" }}>
                    <Stack
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "flex-start",
                        }}
                    >
                        <Stack spacing={2} sx={{ marginTop: "15px" }}>
                            <Card sx={{ display: "flex" }}>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={validUser.avatar}
                                    alt={validUser.name}
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
                                                {validUser.name}
                                            </Typography>

                                            <Typography>
                                                {validUser.email}
                                            </Typography>
                                            <Typography>
                                                You are a great {validUser.role}
                                            </Typography>
                                            <Button
                                                onClick={() => navigate("/")}
                                                sx={{
                                                    backgroundColor:
                                                        "lightpink",
                                                }}
                                            >
                                                LET GO SHOPPING
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Box>
                            </Card>
                        </Stack>
                    </Stack>
                </Stack>
            ) : (
                <Login />
            )}
        </div>
    );
};

export default UserProfile;
