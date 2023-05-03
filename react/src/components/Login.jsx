import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-slate-300 flex-grow h-1/4 flex justify-center items-center">
                <h2 className="font-light text-4xl">Vaccination Platform</h2>
            </div>
            <div className="bg-white flex-grow flex justify-center items-start">
                <div className="bg-slate-300 m-10 w-96 p-2 rounded-md">
                    <h3 className="text-xl font-bold mb-2 ml-2">Login</h3>
                    <form className="text-md bg-white items-start grid grid-cols-3 gap-2 p-3">
                        <label htmlFor="idCard" className="col-span-1 text-end">
                            ID Card Number
                        </label>
                        <input
                            type="text"
                            className="border-solid border-4 rounded-lg col-span-2 h-7"
                        />
                        <label
                            htmlFor="password"
                            className="col-span-1 text-end"
                        >
                            Password
                        </label>
                        <input
                            type="text"
                            className="border-solid border-4 rounded-lg col-span-2 h-7"
                        />
                        <div className="col-span-1"></div>
                        <Link to="/dashboard">
                            <button className="text-start px-3 py-1 bg-blue-300 hover:bg-blue-500 rounded-lg col-span-2">
                                Login
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
