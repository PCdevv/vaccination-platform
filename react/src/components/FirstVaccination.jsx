import React from "react";
import { Link } from "react-router-dom";

const FirstVaccination = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-slate-300 flex-grow h-1/4 flex justify-start items-center pl-6">
                <h2 className="font-light text-4xl">First Vaccination</h2>
            </div>
            <div className="flex justify-between items-center w-2/5 mt-5">
                <h3 className="text-2xl ml-10">
                    List of vaccination spots in Temanggung
                </h3>
            </div>
        </div>
    );
};

export default FirstVaccination;
