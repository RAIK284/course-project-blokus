import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import StartOrJoinGameModal from "../components/modals/StartOrJoinGameModal.jsx";
import "../components/PieceBlock.css";
import RedBlock from "../components/home page pieces/RedBlock.jsx";
import GreenBlock from "../components/home page pieces/GreenBlock.jsx";
import BlueBlock from "../components/home page pieces/BlueBlock.jsx";

function Home() {
  const [isStartOrJoinGameModalOpen, setStartOrJoinGameModalOpen] =
    useState(false);
  const navigate = useNavigate();

  const openStartOrJoinGameModal = () => {
    setStartOrJoinGameModalOpen(true);
  };

  const closeStartOrJoinGameModal = () => {
    setStartOrJoinGameModalOpen(false);
  };

  const navigateLeaderboard = () => {
    navigate(`/leaderboard`);
  };

  const navigateProfile = () => {
    navigate(`/profile`);
  };

  return (
    <>
      <div className="Home">
        <span className="home-title">BLOKUS</span>

        <div className="home-page-buttons">
          <div className="leaderboard-button-container" onClick={navigateLeaderboard}>
            <RedBlock />
            <span className="leaderboard-text">Leaderboard</span>
          </div>

          <div className="horizontal-gap"></div>

          <div
            className="play-button-container"
            onClick={openStartOrJoinGameModal}
          >
            <GreenBlock />
            <span className="play-text">Play</span>
          </div>

          <div className="horizontal-gap"></div>

          <div className="profile-button-container" onClick={navigateProfile}>
            <BlueBlock />
            <span className="profile-text">Profile</span>
          </div>
          <StartOrJoinGameModal
            isOpen={isStartOrJoinGameModalOpen}
            onClose={closeStartOrJoinGameModal}
          />
        </div>
      </div>
      <div class="area" >
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >
    </>
  );
}

export default Home;
