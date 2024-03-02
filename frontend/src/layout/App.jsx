import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Game from "../pages/Game";
import Leaderboard from "../pages/Leaderboard";
import Profile from "../pages/Profile";
import Landing from "../pages/Landing";
import "./App.css";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="app">
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Landing onLogin={handleLogin} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
