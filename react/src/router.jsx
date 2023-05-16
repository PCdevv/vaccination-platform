import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import GuestLayout from "./components/GuestLayout";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import RequestConsultation from "./components/RequestConsultation";
import Hospital from "./components/Hospital";
import SpotDetail from "./components/SpotDetail";
import SpotList from "./components/SpotList";
// import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Navigate to="/dashboard" /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/request-consultation", element: <RequestConsultation /> },
            { path: "/spots", element: <SpotList /> },
            { path: "/spots/:id", element: <SpotDetail /> },
            { path: "/hospital", element: <Hospital /> },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [{ path: "/login", element: <Login /> }],
    },
    { path: "*", element: <NotFound /> },
]);

export default router;
