import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Game from "../pages/Game";
import Leaderboard from "../pages/Leaderboard";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
