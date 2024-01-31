import React from "react";
import ReactDOM from "react-dom/client";
import AuthPage from "./components/Auth/authPage";
import TestPage from "./components/Sections/test.jsx";
import DDlist from "./components/Sections/list_drag_drop.jsx";
import DDlist2 from "./components/Sections/DnD/list_drag_drop v2.jsx";

import "../static/index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Hello world 🥳</h1>
            </div>
          }
        />
        <Route path="/login" element={<AuthPage isSigned={true} />} />
        <Route path="/register" element={<AuthPage isSigned={false} />} />
        <Route path="/test" Component={TestPage} />
        <Route path="/list" Component={DDlist2} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
