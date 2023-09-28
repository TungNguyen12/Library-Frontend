import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <header>
                <NavBar />
            </header>

            <Outlet />

            <footer>This is footer</footer>
        </div>
    );
};

export default Layout;
