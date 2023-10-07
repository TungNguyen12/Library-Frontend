import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { Navigate } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";

const PrivateRoute: React.FC<any> = () => {
    const authenticated = useAppSelector(
        (state) => state.authReducer.currentUser
    );
    return authenticated?.role === "admin" ? (
        <AdminDashboard />
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
