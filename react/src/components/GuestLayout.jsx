import React from "react";
import Navbar from "./Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const GuestLayout = ({ children }) => {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/dashboard" />;
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

export default GuestLayout;
