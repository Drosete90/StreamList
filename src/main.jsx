import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// ✅ Register Service Worker for PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then((registration) => {
                console.log("Service Worker registered:", registration);
            })
            .catch((error) => {
                console.log("Service Worker registration failed:", error);
            });
    });
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);