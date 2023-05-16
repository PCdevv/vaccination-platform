import React, { useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../../axiosClient";
import { Navigate } from "react-router-dom";

const Navbar = () => {
    const { token } = useStateContext();
    const [mssg, setMssg] = useState();

    const handleLogout = () => {
        axiosClient
            .post(`/auth/logout?token=${token}`)
            .then(({ data }) => {
                setMssg(data.message);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("user");
        setInterval(() => {
            window.location.reload();
        }, 2000);
    };

    return (
        <nav className="flex justify-between items-center text-white text-2xl bg-blue-300">
            <h1 className="font-bold mx-6 my-4">Vaccination Platform</h1>
            <div className="flex mx-6 my-4">
                {mssg && <p>{mssg}</p>}
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
