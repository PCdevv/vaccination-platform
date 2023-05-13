import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../../axiosClient";

const Dashboard = () => {
    const [consuls, setConsuls] = useState([]);
    const [firstVaccination, setFirstVaccination] = useState([]);
    const [secondVaccination, setSecondVaccination] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useStateContext();

    const getConsultations = () => {
        axiosClient.get(`/consultations?token=${token}`).then((data) => {
            setConsuls(data.data.consultation[0]);
        });
    };

    const getVaccinations = () => {
        axiosClient
            .get(`/vaccinations?token=${token}`)
            .then((data) => {
                setFirstVaccination(data.data.vaccinations.first);
                setSecondVaccination(data.data.vaccinations.second);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getConsultations();
        getVaccinations();
    }, []);

    if (isLoading) {
        return <div>Loading</div>;
    }

    return (
        <div className="flex flex-col h-screen">
            {console.log(firstVaccination.spot.name)}
            {/* {console.log(secondVaccination.spot)} */}
            <div className="bg-slate-300 flex-grow flex justify-start items-center pl-6 py-20">
                <h2 className="font-light text-4xl">Dashboard</h2>
            </div>
            <div className="bg-white flex-grow flex flex-col justify-start items-start">
                <h3 className="text-2xl ml-10 mt-12">My Consultation</h3>
                {consuls.length == 0 && (
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
                )}
                <table className="border-collapse table-auto bg-slate-300 ml-10 mt-4 p-2 w-96 rounded-md items-start">
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
                            <td className="py-2 pr-4">
                                {consuls.status === "accepted" && (
                                    <p className="bg-blue-400 text-white rounded">
                                        {consuls.status}
                                    </p>
                                )}
                                {consuls.status === "pending" && (
                                    <p className="bg-yellow-400 text-white rounded">
                                        {consuls.status}
                                    </p>
                                )}
                                {consuls.status === "rejected" && (
                                    <p className="bg-red-400 text-white rounded">
                                        {consuls.status}
                                    </p>
                                )}
                            </td>
                        </tr>
                        <tr className="bg-slate-100">
                            <td className="py-2 pl-4">Disase History</td>
                            <td className="py-2 pr-4">
                                {consuls.disease_history}
                            </td>
                        </tr>
                        <tr className="bg-slate-200">
                            <td className="py-2 pl-4">Current Symptoms</td>
                            <td className="py-2 pr-4">
                                {consuls.current_symptoms}
                            </td>
                        </tr>
                        <tr className="bg-slate-100">
                            <td className="py-2 pl-4">Doctor Name</td>
                            <td className="py-2 pr-4">{consuls.doctor_id}</td>
                        </tr>
                        <tr className="bg-slate-200">
                            <td className="py-2 pl-4">Doctor Notes</td>
                            <td className="py-2 pr-4">
                                {consuls.doctor_notes}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 className="text-2xl ml-10 mt-12">My Vaccination</h3>
            {(consuls.status == "pending") | "rejected" | null && (
                <div className="ml-10 mb-10 bg-yellow-200 w-2/3 px-3 py-1 mt-2">
                    Your consultation must be approvedby doctor to get vaccine.
                </div>
            )}
            {consuls.status == "accepted" && (
                <div className="bg-white flex-grow ml-10 pb-10 w-2/3 flex flex-row justify-between items-start">
                    {!firstVaccination && (
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
                    )}
                    {firstVaccination && (
                        <table className="border-collapse table-auto bg-slate-300 ml-10 mt-4 p-2 w-96 rounded-md items-start">
                            <thead>
                                <tr>
                                    <th>
                                        <h3 className="text-xl font-bold my-2 ml-4 text-start">
                                            First Vaccination
                                        </h3>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-slate-200">
                                    <td className="py-2 pl-4">Status</td>
                                    <td className="py-2 pr-4">
                                        {firstVaccination.status === "done" && (
                                            <p className="bg-blue-400 text-white rounded">
                                                Vaccinated
                                            </p>
                                        )}
                                        {firstVaccination.status ===
                                            "undone" && (
                                            <p className="bg-yellow-400 text-white rounded">
                                                Unvaccinated
                                            </p>
                                        )}
                                    </td>
                                </tr>
                                <tr className="bg-slate-100">
                                    <td className="py-2 pl-4">Date</td>
                                    <td className="py-2 pr-4">
                                        {firstVaccination.vaccination_date}
                                    </td>
                                </tr>
                                <tr className="bg-slate-200">
                                    <td className="py-2 pl-4">Spot</td>
                                    <td className="py-2 pr-4">
                                        {firstVaccination.spot.name}
                                    </td>
                                </tr>
                                <tr className="bg-slate-100">
                                    <td className="py-2 pl-4">Vaccine</td>
                                    <td className="py-2 pr-4">
                                        {firstVaccination.vaccinator}
                                    </td>
                                </tr>
                                <tr className="bg-slate-200">
                                    <td className="py-2 pl-4">Vaccinator</td>
                                    <td className="py-2 pr-4">
                                        {firstVaccination.vaccine}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                    {!secondVaccination && (
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
                    )}
                    {secondVaccination && (
                        <table className="border-collapse table-auto bg-slate-300 ml-10 mt-4 p-2 w-96 rounded-md items-start">
                            <thead>
                                <tr>
                                    <th>
                                        <h3 className="text-xl font-bold my-2 ml-4 text-start">
                                            Second Vaccination
                                        </h3>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-slate-200">
                                    <td className="py-2 pl-4">Status</td>
                                    <td className="py-2 pr-4">
                                        {secondVaccination.status ===
                                            "done" && (
                                            <p className="bg-blue-400 text-white rounded">
                                                Vaccinated
                                            </p>
                                        )}
                                        {secondVaccination.status ===
                                            "undone" && (
                                            <p className="bg-yellow-400 text-white rounded">
                                                Unvaccinated
                                            </p>
                                        )}
                                    </td>
                                </tr>
                                <tr className="bg-slate-100">
                                    <td className="py-2 pl-4">Date</td>
                                    <td className="py-2 pr-4">
                                        {secondVaccination.vaccination_date}
                                    </td>
                                </tr>
                                <tr className="bg-slate-200">
                                    <td className="py-2 pl-4">Spot</td>
                                    <td className="py-2 pr-4">
                                        {secondVaccination.spot.name}
                                    </td>
                                </tr>
                                <tr className="bg-slate-100">
                                    <td className="py-2 pl-4">Vaccine</td>
                                    <td className="py-2 pr-4">
                                        {secondVaccination.vaccinator}
                                    </td>
                                </tr>
                                <tr className="bg-slate-200">
                                    <td className="py-2 pl-4">Vaccinator</td>
                                    <td className="py-2 pr-4">
                                        {secondVaccination.vaccine}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
