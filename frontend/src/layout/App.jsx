import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Game from "../pages/Game";
import Leaderboard from "../pages/Leaderboard";
import SignUp from "../pages/Auth/SignUp";
import Profile from "../pages/Profile";
import Landing from "../pages/Landing";
import Login from "../pages/Auth/Login";
import "./App.css";
import { AuthProvider } from "../pages/Auth/AuthContext";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <NavBar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
