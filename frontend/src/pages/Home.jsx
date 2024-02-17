import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import UserProfileModal from "../components/modals/StartOrJoinGameModal.jsx";

function Home() {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const openProfileModal = () => {
    setProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };

  return (
    <div id="home">
      Home Page
      <Link to="/leaderboard">
        <button id="leaderboardButton">Leaderboard</button>
      </Link>
      <button id="playGame" onClick={openProfileModal}>
        Play Game
      </button>
      <Link to="/profile">
        <button id="profile">Profile</button>
      </Link>
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
      />
    </div>
  );
}

export default Home;
