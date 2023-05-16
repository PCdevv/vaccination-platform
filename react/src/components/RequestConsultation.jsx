import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../context/ContextProvider";

const RequestConsultation = () => {
    const [message, setMessage] = useState("");
    const [disease, setDisease] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const diseaseHistory = useRef("");
    const currentSymptoms = useRef("");
    const { token } = useStateContext();

    const submit = (e) => {
        e.preventDefault();
        const payload = {
            disease_history:
                diseaseHistory.current.value != undefined
                    ? diseaseHistory.current.value
                    : "",
            current_symptoms:
                currentSymptoms.current.value != undefined
                    ? currentSymptoms.current.value
                    : "",
        };
        console.log(payload);
        axiosClient
            .post(`/consultations?token=${token}`, payload)
            .then((data) => {
                console.log(data.data.message);
                setMessage(data.data.message);
            })
            .catch((err) => {
                console.log(err);
                // console.log(err.response.data.errors);
                // setError(err.response.data.errors);
            });
        setInterval(() => {
            window.location.replace("/dashboard");
        }, 3000);
    };

    return (
        <div className="flex flex-col h-screen">
            <form onSubmit={submit}>
                <div className="bg-slate-300 flex justify-start items-center pl-6 py-20">
                    <h2 className="font-light text-4xl">
                        Request Consultation
                    </h2>
                </div>
                {message && (
                    <div className="mt-10 text-2xl ml-10 text-blue-300">
                        {message}
                    </div>
                )}
                <div className="flex justify-between items-center w-2/5 mt-5">
                    <h3 className="text-2xl ml-10">
                        Do you have disease history?
                    </h3>
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
                    <div className="ml-10 text-md bg-white items-start">
                        <textarea
                            // required
                            ref={diseaseHistory}
                            name=""
                            id=""
                            cols="63"
                            rows="5"
                            placeholder="Describe your disease history"
                            className="border-solid border-4 rounded-lg my-5 flex-grow p-2"
                        ></textarea>
                    </div>
                ) : null}
                <div className="flex justify-between items-center w-2/5 mt-5">
                    <h3 className="text-2xl ml-10">
                        Do you have symptoms now?
                    </h3>
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
                    <div className="ml-10 text-md bg-white items-start">
                        <textarea
                            // required
                            ref={currentSymptoms}
                            name=""
                            id=""
                            cols="63"
                            rows="5"
                            placeholder="Describe your current symptoms"
                            className="border-solid border-4 rounded-lg my-5 flex-grow p-2"
                        ></textarea>
                    </div>
                ) : null}
                {/* <Link to="/dashboard"> */}
                <button className="text-start ml-10 mt-5 mb-10 px-3 py-1 bg-blue-300 hover:bg-blue-500 rounded-lg col-span-2">
                    Send Request
                </button>
                {/* </Link> */}
            </form>
        </div>
    );
};

export default RequestConsultation;
