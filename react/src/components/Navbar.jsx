import React from "react";

const Navbar = () => {
    return (
        <nav class="flex justify-between items-center text-white text-2xl bg-blue-300">
            <h1 className="font-bold mx-6 my-4">Vaccination Platform</h1>
            <div className="flex mx-6 my-4">
                <button className="px-3 py-1">Username</button>
                <button className="px-3 py-1 hover:bg-blue-500 hover:rounded-lg">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
