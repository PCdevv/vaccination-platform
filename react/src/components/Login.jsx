import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../context/ContextProvider";

const Login = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const idCardRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();

    const handleLogin = (e) => {
        e.preventDefault();
        const payload = {
            id_card_number: idCardRef.current.value,
            password: passwordRef.current.value,
        };
        console.log(payload);
        axiosClient
            .post("/auth/login", payload)
            .then(({ data }) => {
                // setUser(data.name);
                setToken(data.token);
                console.log(data.token);
                // console.log(data.name);
                // console.log(data.token);
            })
            .catch((err) => {
                console.log(err);
                // console.log(err.response.data.message);
                // const response = err.response;
                // if (response && response.status === 401) {
                //     console.log(response.data.message);
                //     setErrorMsg(response.data.message);
                // }
            });
    };
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-slate-300 flex-grow h-1/4 flex justify-center items-center">
                <h2 className="font-light text-4xl">Vaccination Platform</h2>
            </div>
            <div className="bg-white flex-grow flex justify-center items-start">
                <div className="bg-slate-300 m-10 w-96 p-2 rounded-md">
                    <h3 className="text-xl font-bold mb-2 ml-2">Login</h3>
                    <form
                        className="text-md bg-white items-start grid grid-cols-3 gap-2 p-3"
                        onSubmit={handleLogin}
                    >
                        <label className="col-span-1 text-end">
                            ID Card Number
                        </label>
                        <input
                            required
                            ref={idCardRef}
                            type="number"
                            className="border-solid border-4 rounded-lg col-span-2 h-7"
                        />
                        <label className="col-span-1 text-end">Password</label>
                        <input
                            required
                            ref={passwordRef}
                            type="password"
                            className="border-solid border-4 rounded-lg col-span-2 h-7"
                        />
                        <div className="col-span-1"></div>
                        <div>
                            <button className="text-start px-3 py-1 bg-blue-300 hover:bg-blue-500 rounded-lg col-span-2">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
