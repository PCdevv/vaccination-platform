import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const GuestLayout = ({ children }) => {
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
