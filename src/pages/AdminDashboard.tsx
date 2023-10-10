import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { getAllUsersAsync } from "../redux/reducers/userReducer";
import { useAppDispatch } from "../hooks/useAppDispatch";
import UserControl from "../admin/UserControl";

const AdminDashboard = () => {
    return (
        <>
            <UserControl />
        </>
    );
};

export default AdminDashboard;
