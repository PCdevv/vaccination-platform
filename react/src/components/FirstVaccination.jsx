import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../context/ContextProvider";

const FirstVaccination = () => {
    const { token } = useStateContext();
    const [spots, setSpots] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getAllSpots = () => {
        axiosClient
            .get(`/spots?token=${token}`)
            .then((data) => {
                // setSpots()
                setSpots(data.data.spots);
                console.log(data.data.spots);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAllSpots();
    }, []);

    if (isLoading) {
        return <div>Loading</div>;
    }

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
            {spots.map((s) => (
                <Link key={s.id} to={`/spot-detail/${s.id}`}>
                    <div className="bg-slate-300 w-auto grid grid-cols-3 m-6 rounded-3xl p-6">
                        <div className="font-semibold text-blue-500">
                            {s.name}
                        </div>
                        <div className="font-semibold">Available Vaccine</div>
                        <div className="font-semibold">Serve</div>
                        <div>{s.address}</div>
                        <div>
                            {s.available_vaccines.AstraZeneca && (
                                <div>AstraZeneca </div>
                            )}
                            {s.available_vaccines.Moderna && (
                                <div>Moderna </div>
                            )}
                            {s.available_vaccines.Pfizer && <div>Pfizer </div>}
                            {s.available_vaccines.Sinnopharm && (
                                <div>Sinnopharm </div>
                            )}
                            {s.available_vaccines.Sinovac && <div>Sinovac</div>}
                        </div>
                        <div>
                            {s.serve == 1 && <div>Only first vaccination</div>}
                            {s.serve == 2 && <div>Only second vaccination</div>}
                            {s.serve == 3 && <div>Both vaccination</div>}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default FirstVaccination;
