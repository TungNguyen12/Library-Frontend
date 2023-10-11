/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getAllUsersAsync } from "../redux/reducers/userReducer";
import { Box } from "@mui/material";
import SearchInput from "../components/SearchInput";
import { UserPaginationActionsTable } from "../components/UserPagination";

const UserControl = () => {
    const allUsers = useAppSelector((state) => state.usersReducer.users);
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState<string>("");

    const handleGetAllUsers = () => {
        dispatch(getAllUsersAsync());
    };

    useEffect(() => {
        handleGetAllUsers();
    }, []);

    const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.toLocaleLowerCase());
    };

    const usersToShow = search
        ? allUsers.filter((user) =>
              user.name.toLowerCase().includes(search.toLowerCase())
          )
        : allUsers;

    return (
        <Box
            sx={{
                alignContent: "center",
                alignItems: "center",
                display: " flex",
                flexDirection: "column",
                marginTop: "10px",
            }}
        >
            <SearchInput handleSearchProduct={handleSearchUser} />
            <UserPaginationActionsTable rows={usersToShow} />
        </Box>
    );
};

export default UserControl;
