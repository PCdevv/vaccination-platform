import React from "react";

const NotFound = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-slate-300 flex-grow h-1/4 flex justify-center items-center">
                <h2 className="font-light text-4xl">404</h2>
            </div>
            <div className="bg-white flex-grow h-3/4 flex justify-center items-start">
                <h3 className="text-xl font-semibold mt-6">PAGE NOT FOUND</h3>
            </div>
        </div>
    );
};

export default NotFound;
