import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import UserProfileModal from "../components/modals/StartOrJoinGameModal.jsx";

function Home() {
  const [isStartOrJoinGameModalOpen, setStartOrJoinGameModalOpen] =
    useState(false);

  const openStartOrJoinGameModal = () => {
    setStartOrJoinGameModalOpen(true);
  };

  const closeStartOrJoinGameModal = () => {
    setStartOrJoinGameModalOpen(false);
  };

  return (
    <div id="home">
      Home Page
      <Link to="/leaderboard">
        <button id="leaderboardButton">Leaderboard</button>
      </Link>
      <button id="playGame" onClick={openStartOrJoinGameModal}>
        Play Game
      </button>
      <Link to="/profile">
        <button id="profile">Profile</button>
      </Link>
      <UserProfileModal
        isOpen={isStartOrJoinGameModalOpen}
        onClose={closeStartOrJoinGameModal}
      />
    </div>
  );
}

export default Home;
