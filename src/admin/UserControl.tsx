import React, { ReactElement, useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getAllUsersAsync } from "../redux/reducers/userReducer";
import {
    TableContainer,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Box,
    Avatar,
    Typography,
} from "@mui/material";
import User from "../types/user/User";

const UserControl = () => {
    const allUsers = useAppSelector((state) => state.usersReducer.users);
    const dispatch = useAppDispatch();

    const handleGetAllUsers = () => {
        dispatch(getAllUsersAsync());
    };

    useEffect(() => {
        handleGetAllUsers();
    }, []);

    return (
        <TableContainer>
            <Table sx={{ maxWidth: "65%", margin: "50px auto" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>User name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {allUsers.map(
                        (user: User): ReactElement<HTMLTableRowElement> => {
                            return (
                                <TableRow
                                    key={user.id}
                                    component="th"
                                    scope="row"
                                >
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Avatar src={user.avatar} />
                                            <Typography>{user.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{user.email}</Typography>
                                    </TableCell>
                                    <TableCell>{user.role}</TableCell>
                                </TableRow>
                            );
                        }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserControl;
