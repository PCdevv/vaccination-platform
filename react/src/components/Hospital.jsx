import React from "react";
import { Link } from "react-router-dom";

const Hospital = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-slate-300 flex-grow h-1/4 flex justify-start items-center pl-6">
                <h2 className="font-light text-4xl">Hospital</h2>
            </div>
            <div className="bg-white flex-grow h-3/4 flex justify-start items-start">
                <div className="bg-slate-300 m-10 w-96 p-2 rounded-md">
                    <h3 className="text-xl font-bold mb-2 ml-2">
                        Consultation
                    </h3>
                    <form className="text-md bg-white items-start">
                        <Link to="/request-consultation">
                            <button className="flex text-start px-3 py-1 text-blue-500 hover:text-blue-300">
                                <p className="text-slate-400 mr-2">+</p>
                                Request Consultation
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Hospital;
