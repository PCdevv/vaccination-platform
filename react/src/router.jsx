import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import RequestConsultation from "./components/RequestConsultation";
import Hospital from "./components/Hospital";
import FirstVaccination from "./components/FirstVaccination";
// import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Navigate to="/login" /> },
            { path: "/login", element: <Login /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/request-consultation", element: <RequestConsultation /> },
            { path: "/first-vaccination", element: <FirstVaccination /> },
            { path: "/hospital", element: <Hospital /> },
        ],
    },
    { path: "*", element: <NotFound /> },
]);

export default router;
