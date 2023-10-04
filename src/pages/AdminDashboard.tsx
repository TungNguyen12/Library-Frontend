import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { getAllUsersAsync } from "../redux/reducers/userReducer";
import { useAppDispatch } from "../hooks/useAppDispatch";

const AdminDashboard = () => {
    const allUsers = useAppSelector((state) => state.usersReducer.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllUsersAsync());
    }, []);
    return (
        <>
            {allUsers.map((user) => (
                <div key={user.id}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                </div>
            ))}
        </>
    );
};

export default AdminDashboard;
