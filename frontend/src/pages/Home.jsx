import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import StartOrJoinGameModal from "../components/modals/StartOrJoinGameModal.jsx";
import "../components/PieceBlock.css";
import RedBlock from "../components/home page pieces/RedBlock.jsx";
import GreenBlock from "../components/home page pieces/GreenBlock.jsx";
import BlueBlock from "../components/home page pieces/BlueBlock.jsx";

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
    <>
      <div className="Home">
        <span className="home-title">BLOKUS</span>

        <div className="home-page-buttons">
          <Link to="/leaderboard">
            <div className="leaderboard-button-container">
              <RedBlock />
              <span className="leaderboard-text">Leaderboard</span>
            </div>
          </Link>

          <div className="horizontal-gap"></div>

          <div
            className="play-button-container"
            onClick={openStartOrJoinGameModal}
          >
            <GreenBlock />
            <span className="play-text">Play</span>
          </div>

          <div className="horizontal-gap"></div>

          <Link to="/profile">
            <div className="profile-button-container">
              <BlueBlock />
              <span className="profile-text">Profile</span>
            </div>
          </Link>
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
