import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Game from "../pages/Game";
import Leaderboard from "../pages/Leaderboard";
import Profile from "../pages/Profile";
import "./App.css";

function App() {
  return (
    <div className="app">
      <NavBar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          {/* Route path="/login" element={<Login />} */}
          {/* Route path="/signup" element={<Signup />} */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
