import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../../axiosClient";
import { useParams } from "react-router-dom";

const SpotDetail = () => {
    const { token } = useStateContext();
    const [spot, setSpot] = useState();
    const [session, setSession] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [booked, setBooked] = useState(null);

    const formattedDate = new Date().toISOString().slice(0, 10);
    const [vacDate, setVacDate] = useState(formattedDate);

    const getSpot = () => {
        axiosClient
            .get(`/spots/${id}?token=${token}&date=${vacDate}`)
            .then((data) => {
                setSpot(data.data.spot);
                setSession(data.data.vaccination_slot);
                console.log(data.data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    };

    // const registerVaccine = () => {
    //     axiosClient
    //         .get(`/spots/${id}?token=${token}&date=${formattedDate}`)
    //         .then((data) => {
    //             // setSpots()
    //             // setSpot(data.data);
    //             console.log(data.data);
    //             // setIsLoading(false);
    //         })
    //         .catch((err) => console.log(err));
    // };

    useEffect(() => {
        getSpot();
        // console.log(formattedDate);
    }, []);

    if (isLoading) {
        return <div>Loading</div>;
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-slate-300 flex-grow h-1/4 flex justify-between items-center px-6">
                <div className="">
                    <h2 className="font-semibold text-4xl">{spot.name}</h2>
                    <h2 className="font-light text-lg">{spot.address}</h2>
                </div>
                <button className="text-start px-3 py-1 bg-blue-300 hover:bg-blue-500 rounded-lg col-span-2">
                    Register Vaccination
                </button>
            </div>
            <div className="flex-col ml-10 items-center w-2/5 mt-5">
                <h3 className="text-2xl">Select Vaccination Date</h3>
                <input
                    className="border-solid border-4 rounded-lg my-5 flex-grow p-2"
                    type="date"
                    name=""
                    id=""
                    onChange={(e) => {
                        axiosClient
                            .get(
                                `/spots/${id}?token=${token}&date=${e.target.value}`
                            )
                            .then((data) => {
                                setSpot(data.data.spot);
                                setSession(data.data.vaccination_slot);
                                console.log(data.data);
                                setIsLoading(false);
                            })
                            .catch((err) => console.log(err));
                    }}
                />
            </div>
            <div className="grid grid-cols-3 gap-6 m-10">
                <div className="border-solid border-4 rounded-lg my-5 flex-grow p-2">
                    <div className="flex flex-grow justify-between">
                        <div className="font-semibold">Session 1</div>
                        <div className="">09:00 - 11:00</div>
                    </div>
                    <div className="grid grid-cols-4 m-5 gap-5">
                        {session.session_1.map((ses) => (
                            <div
                                key={ses.queue}
                                className="flex bg-slate-300 rounded-lg w-12 h-12 items-center justify-center"
                            >
                                <div className="font-semibold">
                                    <input
                                        // ref={bookSession}
                                        type="radio"
                                        value={ses.queue}
                                        name="queue"
                                        onChange={() => {
                                            setBooked(ses.queue);
                                            console.log(ses.queue);
                                        }}
                                    />
                                    {ses.queue}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-solid border-4 rounded-lg my-5 flex-grow p-2">
                    <div className="flex flex-grow justify-between">
                        <div className="font-semibold">Session 2</div>
                        <div className="">13:00 - 15:00</div>
                    </div>
                    <div className="grid grid-cols-4 m-5 gap-5">
                        {session.session_2.map((ses) => (
                            <div
                                key={ses.queue}
                                className="flex bg-slate-300 rounded-lg w-12 h-12 items-center justify-center"
                            >
                                <div className="font-semibold">
                                    #{ses.queue}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-solid border-4 rounded-lg my-5 flex-grow p-2">
                    <div className="flex flex-grow justify-between">
                        <div className="font-semibold">Session 3</div>
                        <div className="">15:00 - 17:00</div>
                    </div>
                    <div className="grid grid-cols-4 m-5 gap-5">
                        {session.session_3.map((ses) => (
                            <div
                                key={ses.queue}
                                className="flex bg-slate-300 rounded-lg w-12 h-12 items-center justify-center"
                            >
                                <div className="font-semibold">
                                    #{ses.queue}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpotDetail;
