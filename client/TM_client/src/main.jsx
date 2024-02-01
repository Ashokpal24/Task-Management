import React from "react";
import ReactDOM from "react-dom/client";
import AuthPage from "./components/Auth/authPage";
import TestPage from "./components/RND/test.jsx";
import DnDComponent from "./components/DnD/list_drag_drop v2.jsx";
import HeroPage from "./components/Hero/hero.jsx";

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
        <Route path="/list" Component={DnDComponent} />
        <Route path="/hero" Component={HeroPage} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
