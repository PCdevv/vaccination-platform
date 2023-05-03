import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [consuls, setConsuls] = useState([{}]);

    const getConsultations = async () => {
        const data = await axios.get(
            "http://127.0.0.1:8000/api/v1/consultations"
        );
        // console.log(data.data.consultation);
        setConsuls(data.data.consultation);
    };

    useEffect(() => {
        getConsultations();
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-slate-300 flex-grow flex justify-start items-center pl-6 py-20">
                <h2 className="font-light text-4xl">Dashboard</h2>
            </div>
            <div className="bg-white flex-grow flex flex-col justify-start items-start">
                <h3 className="text-2xl ml-10 mt-12">My Consultation</h3>
                <div className="bg-slate-300 ml-10 mt-4  p-2 w-96 rounded-md">
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
                {consuls.map((consul) => (
                    <table
                        key={consul.id}
                        className="border-collapse table-auto bg-slate-300 ml-10 mt-4 p-2 w-96 rounded-md items-start"
                    >
                        <thead>
                            <tr>
                                <th>
                                    <h3 className="text-xl font-bold my-2 ml-4 text-start">
                                        Consultation
                                    </h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-slate-200">
                                <td className="py-2 pl-4">Status</td>
                                <td className="py-2 pr-4">{consul.status}</td>
                            </tr>
                            <tr className="bg-slate-100">
                                <td className="py-2 pl-4">Disase History</td>
                                <td className="py-2 pr-4">
                                    {consul.disease_history}
                                </td>
                            </tr>
                            <tr className="bg-slate-200">
                                <td className="py-2 pl-4">Current Symptoms</td>
                                <td className="py-2 pr-4">
                                    {consul.current_symptoms}
                                </td>
                            </tr>
                            <tr className="bg-slate-100">
                                <td className="py-2 pl-4">Doctor Name</td>
                                <td className="py-2 pr-4">
                                    {consul.doctor_id}
                                </td>
                            </tr>
                            <tr className="bg-slate-200">
                                <td className="py-2 pl-4">Doctor Notes</td>
                                <td className="py-2 pr-4">
                                    {consul.doctor_notes}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>
            <h3 className="text-2xl ml-10 mt-12">My Vaccination</h3>
            <div className="ml-10 bg-yellow-200 w-2/3 px-3 py-1 mt-2">
                Your consultation must be approvedby doctor to get vaccine.
            </div>
            <div className="bg-white flex-grow ml-10 pb-10 w-2/3 flex flex-row justify-between items-start">
                <div className="bg-slate-300 mt-4  p-2 w-96 rounded-md">
                    <h3 className="text-xl font-bold mb-2 ml-2">
                        First Vaccination
                    </h3>
                    <form className="text-md bg-white items-start">
                        <Link to="/first-vaccination">
                            <button className="flex text-start px-3 py-1 text-blue-500 hover:text-blue-300">
                                <p className="text-slate-400 mr-2">+</p>
                                Register Vaccination
                            </button>
                        </Link>
                    </form>
                </div>
                <div className="bg-slate-300 mt-4  p-2 w-96 rounded-md">
                    <h3 className="text-xl font-bold mb-2 ml-2">
                        Second Vaccination
                    </h3>
                    <form className="text-md bg-white items-start">
                        <Link to="/first-vaccination">
                            <button className="flex text-start px-3 py-1 text-blue-500 hover:text-blue-300">
                                <p className="text-slate-400 mr-2">+</p>
                                Register Vaccination
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
