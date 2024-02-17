import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import UserProfileModal from "../components/modals/UserProfileModal.jsx";

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
      <Link to="/game">
        <button id="playGame">Play Game</button>
      </Link>
      <button id="profile" onClick={openProfileModal}>
        Profile
      </button>
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
      />
    </div>
  );
}

export default Home;
