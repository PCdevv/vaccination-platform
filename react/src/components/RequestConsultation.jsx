import React, { useState } from "react";
import { Link } from "react-router-dom";

const RequestConsultation = () => {
    const [disease, setDisease] = useState("");
    const [symptoms, setSymptoms] = useState("");

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-slate-300 flex justify-start items-center pl-6 py-20">
                <h2 className="font-light text-4xl">Request Consultation</h2>
            </div>
            <div className="flex justify-between items-center w-2/5 mt-5">
                <h3 className="text-2xl ml-10">Do you have disease history?</h3>
                <select
                    name="disease"
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                    className="border-solid border-4 rounded-lg"
                >
                    <option value="">No, I don't</option>
                    <option value="yes">Yes, I have</option>
                </select>
            </div>
            {disease === "yes" ? (
                <form className="ml-10 text-md bg-white items-start">
                    <textarea
                        name=""
                        id=""
                        cols="63"
                        rows="5"
                        placeholder="Describe your disease history"
                        className="border-solid border-4 rounded-lg my-5 flex-grow p-2"
                    ></textarea>
                </form>
            ) : null}
            <div className="flex justify-between items-center w-2/5 mt-5">
                <h3 className="text-2xl ml-10">Do you have symptoms now?</h3>
                <select
                    name="symptoms"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="border-solid border-4 rounded-lg"
                >
                    <option value="">No, I don't</option>
                    <option value="yes">Yes, I have</option>
                </select>
            </div>
            {symptoms === "yes" ? (
                <form className="ml-10 text-md bg-white items-start">
                    <textarea
                        name=""
                        id=""
                        cols="63"
                        rows="5"
                        placeholder="Describe your current symptoms"
                        className="border-solid border-4 rounded-lg my-5 flex-grow p-2"
                    ></textarea>
                </form>
            ) : null}
            <Link to="/dashboard">
                <button className="text-start ml-10 mt-5 mb-10 px-3 py-1 bg-blue-300 hover:bg-blue-500 rounded-lg col-span-2">
                    Send Request
                </button>
            </Link>
        </div>
    );
};

export default RequestConsultation;
