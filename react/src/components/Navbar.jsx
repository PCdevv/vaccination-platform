import React from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../../axiosClient";
import { Navigate } from "react-router-dom";

const Navbar = () => {
    const { token } = useStateContext();

    const handleLogout = () => {
        axiosClient
            .post(`/auth/logout?token=${token}`)
            .then(({ data }) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <nav className="flex justify-between items-center text-white text-2xl bg-blue-300">
            <h1 className="font-bold mx-6 my-4">Vaccination Platform</h1>
            <div className="flex mx-6 my-4">
                <button className="px-3 py-1">
                    {localStorage.getItem("user")}
                </button>
                {token && (
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1 hover:bg-blue-500 hover:rounded-lg"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
