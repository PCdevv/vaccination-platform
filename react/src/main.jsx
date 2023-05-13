import React from "react";
import ReactDOM from "react-dom/client";
import { ContextProvider } from "./context/ContextProvider";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import "tailwindcss/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    </React.StrictMode>
);
