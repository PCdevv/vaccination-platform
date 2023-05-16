import React from "react";
import Navbar from "./Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const Layout = ({ children }) => {
    const { user, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
