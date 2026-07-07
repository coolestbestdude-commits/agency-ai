import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";   // ⭐ THIS WAS MISSING — Tailwind will not load without it

import App from "./App.jsx";
import Pricing from "./components/Pricing.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  </BrowserRouter>
);
